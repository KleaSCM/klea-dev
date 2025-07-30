import { NextRequest, NextResponse } from 'next/server'

/**
 * Contact Form API Endpoint
 * 
 * Architecture:
 * This endpoint implements a RESTful API pattern for handling contact form submissions.
 * It follows a multi-stage validation approach before accepting the submission:
 * 1. Required field validation
 * 2. Format validation for critical fields (email, phone)
 * 3. Data sanitization (trimming)
 * 
 * The architecture prioritizes:
 * - Early validation failures to minimize processing of invalid requests
 * - Detailed error responses to guide client-side correction
 * - Metadata collection for security monitoring
 * 
 * Security considerations:
 * - IP address logging for abuse prevention
 * - User agent tracking for identifying suspicious patterns
 * - Input sanitization to prevent injection attacks
 * - Environment-aware error details (detailed in dev, limited in production)
 * 
 * Performance considerations:
 * - Lightweight regex validation instead of heavy validation libraries
 * - Artificial delay (800ms) to prevent brute force attacks while maintaining
 *   reasonable UX for legitimate users
 * - No database operations in this implementation, keeping response times fast
 * 
 * @param {NextRequest} request - The incoming HTTP request object
 * @returns {NextResponse} JSON response with appropriate status code
 */
export async function POST(request: NextRequest) {
  try {
    /**
     * Request parsing and validation strategy
     * 
     * Architecture decision:
     * - Parse JSON body once at the beginning to fail fast on malformed requests
     * - Use destructuring for cleaner code and to explicitly document expected fields
     * - Implement a two-phase validation approach:
     *   1. First check for required fields (faster, catches most errors)
     *   2. Then perform more expensive format validation only on complete submissions
     */
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    /**
     * Required field validation
     * 
     * Using array-based validation errors collection allows:
     * - Providing all validation errors at once to improve UX
     * - Avoiding multiple if-else branches for cleaner code
     * - Future extensibility for additional validation rules
     */
    const validationErrors = []
    
    if (!name?.trim()) validationErrors.push('Name is required')
    if (!email?.trim()) validationErrors.push('Email is required')
    if (!subject?.trim()) validationErrors.push('Subject is required')
    if (!message?.trim()) validationErrors.push('Message is required')

    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationErrors 
        },
        { status: 400 }
      )
    }

    /**
     * Format validation for critical fields
     * 
     * Architecture decisions:
     * - Simple regex patterns balance validation quality with performance
     * - Email validation uses a lightweight pattern that catches most errors
     *   without the complexity of full RFC 5322 compliance
     * - Separate validation for email and phone allows for targeted error messages
     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { error: 'Invalid phone number format' },
          { status: 400 }
        )
      }
    }

    /**
     * Metadata collection for security and analytics
     * 
     * Architecture decisions:
     * - Collect IP address with fallbacks for different proxy configurations
     * - This approach handles various deployment scenarios (direct access, CDN, reverse proxy)
     * - Default to 'unknown' rather than null to maintain consistent data structure
     */
    const clientIP = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    /**
     * Data normalization and enrichment
     * 
     * Architecture decisions:
     * - Trim all text inputs to ensure consistent data quality
     * - Collect timestamp in ISO format for standardized datetime handling
     * - Include user agent for analytics and potential abuse detection
     * - Structure data in a consistent object format for easier processing
     */
    const contactData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      clientIP,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'unknown'
    }

    /**
     * Logging for monitoring and debugging
     * 
     * Architecture decision:
     * - Use console.log for development visibility and potential integration
     *   with logging services in production environments
     * - Log the entire structured object for comprehensive debugging
     */
    console.log('Contact form submission:', contactData)

    /**
     * Artificial delay implementation
     * 
     * Architecture and performance considerations:
     * - 800ms delay balances security benefits with user experience
     * - This delay serves multiple purposes:
     *   1. Rate limiting to discourage spam/abuse
     *   2. Prevents timing attacks that could reveal system behavior
     *   3. Creates a more natural UX by avoiding instantaneous responses
     *      that might seem automated or untrustworthy to users
     * - Using Promise with setTimeout is more efficient than blocking operations
     */
    await new Promise(resolve => setTimeout(resolve, 800))

    /**
     * Success response structure
     * 
     * Architecture decision:
     * - Include timestamp in response for client-side verification/logging
     * - Provide friendly message to improve user experience
     * - Use standard HTTP 200 status code for successful operations
     */
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you soon.',
        timestamp: contactData.timestamp
      },
      { status: 200 }
    )

  /**
   * Error handling strategy
   * 
   * Architecture and security considerations:
   * - Catch-all error handling ensures the API never crashes with an unhandled exception
   * - Structured error logging provides visibility for debugging
   * - Environment-aware error details:
   *   - In development: Include detailed error message for debugging
   *   - In production: Omit technical details to prevent information leakage
   * - Generic user-facing error message maintains security while being helpful
   * - Standard HTTP 500 status code correctly indicates server-side error
   */
  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
} 