# Windsurf Unity MCP Setup Guide

This guide will help you set up the Windsurf Unity MCP integration for seamless Unity Editor control from Windsurf IDE.

## Prerequisites

- **Unity Editor 2022.3 LTS or later**
- **Node.js 18+ and npm**
- **Windsurf IDE** with MCP support
- **Git** for version control

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/isekream/Windsurf_Unity_MCP.git
cd Windsurf_Unity_MCP
```

### 2. Install Node.js Dependencies

```bash
cd Server
npm install
```

### 3. Build the MCP Server

```bash
npm run build
```

### 4. Install Unity Package

1. Open Unity Editor
2. Open your Unity project
3. In the Package Manager, click the `+` button
4. Select "Add package from disk..."
5. Navigate to `Windsurf_Unity_MCP/Unity/package.json`
6. Click "Open"

Alternatively, you can copy the `Unity` folder contents to your project's `Packages` directory.

## Configuration

### 1. Unity Setup

1. Open Unity Editor
2. Go to `Tools > Windsurf MCP > Server Window`
3. Configure the WebSocket port (default: 8090)
4. Enable "Auto Start Server" if desired
5. Click "Start Server"

The Unity MCP server should now be running and ready to accept connections.

### 2. Windsurf Configuration

1. Open Windsurf IDE
2. Open your project settings
3. Navigate to MCP configuration
4. Add the Unity MCP server configuration:

```json
{
  "mcpServers": {
    "unity": {
      "command": "node",
      "args": ["./Server/build/index.js"],
      "env": {
        "UNITY_PORT": "8090",
        "REQUEST_TIMEOUT": "10"
      }
    }
  }
}
```

**Note**: This configuration assumes you're running Windsurf from the project root directory. For global installation, use the `windsurf-unity-mcp` command instead.

### 3. Environment Variables

You can configure the MCP server using these environment variables:

- `UNITY_PORT`: WebSocket port for Unity connection (default: 8090)
- `REQUEST_TIMEOUT`: Request timeout in seconds (default: 10)
- `LOG_LEVEL`: Logging level (debug, info, warn, error)

## Verification

### 1. Test Unity Connection

1. Ensure Unity Editor is running with the MCP server started
2. Check the Unity MCP Server window for connection status
3. Look for "Connected Clients: 1" when Windsurf connects

### 2. Test Windsurf Integration

1. Open Windsurf IDE
2. Try asking the AI assistant: "Analyze my Unity project"
3. The AI should be able to provide information about your Unity project

### 3. Available Commands

Once set up, you can use natural language commands like:

- "Analyze my Unity project structure"
- "Create a new GameObject called 'Player'"
- "Build the project for Windows"
- "Show me the current scene hierarchy"
- "Create a new C# script for player movement"

## Troubleshooting

### Common Issues

#### Unity Server Won't Start

- **Check port availability**: Ensure port 8090 (or your configured port) is not in use
- **Firewall settings**: Make sure your firewall allows connections on the configured port
- **Unity console errors**: Check the Unity Console for any error messages

#### Windsurf Can't Connect

- **Server running**: Verify the Unity MCP server is running (green status in Unity)
- **Path configuration**: Double-check the path to the MCP server in Windsurf config
- **Node.js version**: Ensure you're using Node.js 18 or later
- **Build status**: Make sure you've built the server with `npm run build`

#### Commands Not Working

- **Tool registration**: Check the Unity MCP Server window for registered tools
- **Parameter format**: Ensure you're using the correct parameter format for tools
- **Unity state**: Some tools require Unity to be in Edit Mode (not Play Mode)

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
export LOG_LEVEL=debug
```

Or in Windsurf configuration:

```json
{
  "mcpServers": {
    "unity": {
      "command": "node",
      "args": ["./Server/build/index.js"],
      "env": {
        "UNITY_PORT": "8090",
        "LOG_LEVEL": "debug"
      }
    }
  }
}
```

### Getting Help

1. **Check logs**: Review both Unity Console and Windsurf logs for error messages
2. **Unity MCP Server window**: Use the built-in logging and export functionality
3. **GitHub Issues**: Report bugs or ask questions on the project repository
4. **Documentation**: Refer to the API documentation for advanced usage

## Next Steps

- Explore the [API Documentation](API.md) for advanced usage
- Check out [Examples](../examples/) for common use cases
- Contribute to the project by adding new tools or features

## Security Considerations

- The MCP server runs locally and only accepts connections from localhost
- WebSocket communication is unencrypted (suitable for local development)
- Be cautious when running automated build or file operations
- Consider firewall rules if working in a shared network environment 