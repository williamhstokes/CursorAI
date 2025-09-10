# UAGC DX Team Hub Dashboard

A modern, interactive dashboard for the UAGC Digital Experience team with integrated AI image generation capabilities.

## Features

### 🎨 Visual Dashboard
- **Team Member Cards**: Interactive cards showing team roles, skills, and responsibilities
- **Documentation Categories**: Visual navigation for different documentation sections
- **Quick Reference Table**: Easy access to common tasks and their owners
- **Strategic Resources**: Visual indicators for key strategic initiatives
- **Recent Updates**: Timeline of recent documentation updates

### 🤖 AI Image Generation
- **OpenAI DALL-E 3 Integration**: Generate high-quality images from text descriptions
- **Multiple Styles**: Choose between vivid and natural image styles
- **Various Sizes**: Support for different image dimensions (1024x1024, 1792x1024, 1024x1792)
- **Image Gallery**: View, download, copy URLs, and manage generated images
- **Sample Prompts**: Pre-built suggestions for common use cases

### 🔍 Interactive Features
- **Real-time Search**: Filter dashboard content by keywords
- **Hover Effects**: Smooth animations and visual feedback
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with gradient backgrounds

## Setup Instructions

### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (starts with `sk-`)

### 2. Configure the Dashboard
1. Open `index.html` in a text editor
2. Find line 869: `const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE';`
3. Replace `'YOUR_OPENAI_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Run the Dashboard
1. Open `index.html` in a web browser
2. The dashboard will load with all team information
3. Use the AI Image Generator section to create images

## Usage

### Generating Images
1. Enter a description in the prompt input field
2. Select your preferred style (vivid or natural)
3. Choose image size
4. Click "Generate Image" or press Enter
5. Wait for the image to generate (usually 10-30 seconds)
6. View, download, or manage the generated image

### Sample Prompts
The dashboard includes sample prompts for inspiration:
- "A modern team collaboration workspace with digital screens and creative elements"
- "Professional web development team working on a project together"
- "Abstract representation of digital transformation and innovation"
- "Clean, modern dashboard interface with data visualizations"
- "Team meeting room with whiteboards and technology setup"

### Managing Images
- **Download**: Click the download button to save images locally
- **Copy URL**: Copy the image URL to clipboard for sharing
- **Delete**: Remove images from the gallery
- **View**: Hover over images to see action buttons

## Team Structure

### Leadership
- **Thomas**: DX Director / Product Owner
- **Brandy**: Digital Marketing & Web Operations Manager

### Backend Development
- **Jason**: Senior Backend Drupal Engineer
- **Will**: Backend Engineer

### Frontend Development & QA
- **Brian**: Front-End Dev & QA Lead
- **Anthony**: Front-End Developer & Experiment Engineer

### Marketing & Analytics
- **Omar**: SEO & Analytics Specialist

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript ES6+**: Interactive functionality and API integration
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Inter font family
- **OpenAI API**: DALL-E 3 image generation

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### API Requirements
- OpenAI API key with DALL-E 3 access
- Internet connection for image generation
- Modern browser with JavaScript enabled

## Security Notes

⚠️ **Important**: Never commit your OpenAI API key to version control. The current setup uses a placeholder that should be replaced with your actual key.

For production use, consider:
- Using environment variables
- Implementing server-side API calls
- Adding rate limiting and usage monitoring

## Customization

### Adding Team Members
1. Find the team member section in the HTML
2. Copy an existing team member card
3. Update the name, role, and skills
4. Modify the avatar initial

### Modifying Styles
1. Edit the CSS variables at the top of the `<style>` section
2. Update color schemes, fonts, or spacing
3. Modify animations and transitions

### Adding Features
1. Extend the `ImageGenerator` class
2. Add new event listeners
3. Implement additional API integrations

## Troubleshooting

### Common Issues
1. **"Please add your OpenAI API key"**: Make sure you've replaced the placeholder with your actual API key
2. **"Failed to generate image"**: Check your internet connection and API key validity
3. **Images not loading**: Ensure your browser supports modern JavaScript features
4. **CORS errors**: The dashboard should work in modern browsers, but some local file restrictions may apply

### Getting Help
- Check the browser console for error messages
- Verify your OpenAI API key is correct
- Ensure you have sufficient API credits
- Try different prompts if generation fails

## License

This project is for internal use by the UAGC Digital Experience team.

---

**Built with ❤️ for the UAGC DX Team**
