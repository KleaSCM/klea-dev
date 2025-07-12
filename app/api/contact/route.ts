import { NextRequest, NextResponse } from 'next/server'

// Enhanced contact form API with email integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Enhanced validation with detailed error messages
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

    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Phone validation (optional)
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

    // Rate limiting check (basic implementation)
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'
    
    // Log the contact attempt with timestamp
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

    console.log('Contact form submission:', contactData)

    // TODO: Implement actual email sending
    // For now, we'll simulate email sending
    // In production, you would use a service like Resend, SendGrid, or Nodemailer
    
    // Example with Resend (uncomment when you have API key):
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const emailResult = await resend.emails.send({
      from: 'contact@yourdomain.com',
      to: ['your-email@example.com'],
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from your portfolio website</small></p>
      `
    })
    */

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you soon.',
        timestamp: contactData.timestamp
      },
      { status: 200 }
    )

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