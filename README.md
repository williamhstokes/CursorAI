# UAGC DX Team Hub Dashboard

A modern, interactive dashboard for the UAGC Digital Experience team with integrated ChatGPT assistant capabilities.

## Features

### 🎨 Visual Dashboard
- **Team Member Cards**: Interactive cards showing team roles, skills, and responsibilities
- **Documentation Categories**: Visual navigation for different documentation sections
- **Quick Reference Table**: Easy access to common tasks and their owners
- **Strategic Resources**: Visual indicators for key strategic initiatives
- **Recent Updates**: Timeline of recent documentation updates

### 🤖 ChatGPT Assistant
- **OpenAI ChatGPT Integration**: Chat with AI assistant for web development help
- **Multiple Models**: Choose between GPT-3.5 Turbo, GPT-4, and GPT-4 Turbo
- **Conversation History**: Maintains context throughout the chat session
- **Typing Indicators**: Visual feedback when ChatGPT is responding
- **Sample Questions**: Pre-built suggestions for common development topics

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

### Using ChatGPT Assistant
1. Type your question or message in the chat input field
2. Select your preferred model (GPT-3.5 Turbo, GPT-4, or GPT-4 Turbo)
3. Click "Send" or press Enter
4. Wait for ChatGPT to respond (usually 2-5 seconds)
5. Continue the conversation with follow-up questions

### Sample Questions
The dashboard includes sample questions for inspiration:
- "How can I improve the performance of our Drupal website?"
- "What are the best practices for SEO optimization?"
- "Help me debug this JavaScript error"
- "What's the latest in web accessibility standards?"
- "How do I implement A/B testing with Optimizely?"

### Chat Features
- **Conversation History**: Maintains context throughout your session
- **Model Selection**: Choose between different GPT models
- **Clear Chat**: Reset the conversation history
- **Typing Indicators**: See when ChatGPT is responding
- **Auto-scroll**: Automatically scrolls to new messages

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
- **OpenAI API**: ChatGPT chat completions

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### API Requirements
- OpenAI API key with ChatGPT access
- Internet connection for chat functionality
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
2. **"Failed to get response from ChatGPT"**: Check your internet connection and API key validity
3. **Chat not working**: Ensure your browser supports modern JavaScript features
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
