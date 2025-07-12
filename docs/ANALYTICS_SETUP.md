# Analytics Setup Guide

## Overview

This guide covers the complete setup of analytics for the portfolio website, including Google Analytics 4, custom event tracking, and performance monitoring.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Required Variables

```bash
# Google Analytics 4 - Get your Measurement ID from Google Analytics
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Optional Variables

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://klea-dev.com
NEXT_PUBLIC_SITE_NAME=Klea Dev Portfolio

# Contact Form Configuration
CONTACT_EMAIL=klea@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password

# Social Media Links
NEXT_PUBLIC_GITHUB_URL=https://github.com/klea-dev
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/klea-dev
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/klea-dev

# Analytics Configuration
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PERFORMANCE_TRACKING=true
NEXT_PUBLIC_ENABLE_SCROLL_TRACKING=true

# SEO Configuration
NEXT_PUBLIC_SITE_DESCRIPTION=AI Systems Engineer specializing in native AI engines, cognitive systems, trait/desire models, and recursive agents.
NEXT_PUBLIC_SITE_KEYWORDS=AI Systems Engineer,Cognitive Systems,Native AI Engines,Trait Models,Desire Models,State Engines,Recursive Agents,Machine Learning,Go Programming,C++ Development,Python Development,TypeScript,React,Next.js,Fullstack Developer,Cognitive Architecture,AI Research,Systems Programming
```

## Google Analytics 4 Setup

### 1. Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Enter property name: "Klea Dev Portfolio"
4. Configure data sharing settings
5. Create property

### 2. Get Measurement ID

1. In your GA4 property, go to Admin
2. Under "Property", click "Data streams"
3. Click on your web stream
4. Copy the Measurement ID (G-XXXXXXXXXX)

### 3. Add to Environment

Add the Measurement ID to your `.env.local`:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Custom Events Configuration

### Contact Form Events

The following events are automatically tracked:

- `contact_form_success` - Successful form submission
- `contact_form_error` - Form submission error
- `contact_form_network_error` - Network connection error

### Project Interaction Events

- `project_interaction` - User interaction with project cards
- `project_view` - Project page view

### Performance Events

- `page_performance` - Page load performance metrics
- `scroll_depth` - User scroll depth (25% increments)

## Testing Analytics

### 1. Development Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open browser developer tools
3. Check Console for analytics initialization
4. Test contact form submission
5. Check Network tab for GA4 requests

### 2. Production Testing

1. Deploy to production
2. Use Google Analytics Real-Time reports
3. Test all tracking events
4. Verify data collection

## Privacy Compliance

### GDPR Compliance

The analytics implementation includes:

- **IP Anonymization**: Enabled by default
- **Secure Cookies**: SameSite=None;Secure flags
- **User Consent**: Ready for consent management integration
- **Data Retention**: Configurable in GA4

### Privacy Features

```javascript
// IP anonymization enabled
anonymize_ip: true,

// Secure cookie configuration
cookie_flags: 'SameSite=None;Secure'
```

## Analytics Dashboard Setup

### 1. Custom Reports

Create the following custom reports in GA4:

#### Contact Form Performance
- Event: `contact_form_success`
- Event: `contact_form_error`
- Metric: Event count by day

#### Project Engagement
- Event: `project_interaction`
- Dimension: Event parameter (project_name)
- Metric: Event count

#### Performance Metrics
- Event: `page_performance`
- Metric: Custom parameters (load_time, dom_content_loaded)

### 2. Goals and Conversions

Set up the following goals:

1. **Contact Form Submission**
   - Event: `contact_form_success`
   - Value: 1

2. **Project View**
   - Event: `project_interaction`
   - Value: 1

3. **Scroll Depth**
   - Event: `scroll_depth`
   - Value: Custom parameter (depth)

### 3. Audience Segments

Create segments for:

- **High Engagement Users**: Users with >3 page views
- **Contact Form Users**: Users who submitted contact form
- **Project Explorers**: Users who viewed multiple projects

## Troubleshooting

### Common Issues

#### Analytics Not Loading

1. Check environment variable:
   ```bash
   echo $NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```

2. Verify GA4 property setup
3. Check browser console for errors

#### Events Not Tracking

1. Verify event names match GA4 configuration
2. Check browser network tab for GA4 requests
3. Test in incognito mode

#### Performance Issues

1. Check Core Web Vitals in GA4
2. Monitor page load times
3. Optimize images and assets

### Debug Mode

Enable debug mode for development:

```bash
NEXT_PUBLIC_DEBUG_ANALYTICS=true
```

## Advanced Configuration

### Custom Dimensions

Add custom dimensions in GA4:

1. **Project Name**: Track which projects are most viewed
2. **Form Type**: Track different form interactions
3. **User Type**: New vs returning visitors

### Enhanced Ecommerce

For future ecommerce features:

```javascript
// Track project "purchases" (views)
gtag('event', 'purchase', {
  transaction_id: project_name,
  value: 1,
  currency: 'USD'
});
```

### A/B Testing

Prepare for A/B testing:

```javascript
// Track experiment participation
gtag('event', 'experiment_impression', {
  experiment_id: 'contact_form_variant',
  variant: 'enhanced_form'
});
```

## Maintenance

### Regular Tasks

1. **Weekly**: Check GA4 reports for anomalies
2. **Monthly**: Review performance metrics
3. **Quarterly**: Update custom reports and goals

### Data Retention

Configure data retention in GA4:

1. Go to Admin > Property Settings
2. Set data retention period (recommended: 26 months)
3. Configure data deletion requests

### Backup and Recovery

1. Export custom reports regularly
2. Document custom event configurations
3. Backup GA4 property settings

## Support

For issues with analytics setup:

1. Check this documentation
2. Review GA4 help center
3. Test in development environment
4. Verify environment variables

## Next Steps

After completing analytics setup:

1. **Implement additional tracking**:
   - Social media link clicks
   - Download tracking
   - Video engagement

2. **Set up advanced features**:
   - Conversion funnels
   - User journey analysis
   - A/B testing framework

3. **Optimize based on data**:
   - Improve high-bounce pages
   - Enhance popular content
   - Optimize conversion paths 