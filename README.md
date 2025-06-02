# Windsurf Unity MCP

> **🔒 Security Notice**: Before sharing or contributing to this project, please review [SECURITY_AND_PRIVACY.md](SECURITY_AND_PRIVACY.md) to ensure you don't accidentally expose personal information like usernames, file paths, or system details.

<div align="center">

```
                              ,/(/.   *(/,                                  
                          */(((((/.   *((((((*.                             
                     .*((((((((((/.   *((((((((((/.                         
                 ./((((((((((((((/    *((((((((((((((/,                     
             ,/(((((((((((((/*.           */(((((((((((((/*.                
            ,%%#((/((((((*                    ,/(((((/(#&@@(                
            ,%%##%%##((((((/*.             ,/((((/(#&@@@@@@(                
            ,%%######%%##((/(((/*.    .*/(((//(%@@@@@@@@@@@(                
            ,%%####%#(%%#%%##((/((((((((//#&@@@@@@&@@@@@@@@(                
            ,%%####%(    /#%#%%%##(//(#@@@@@@@%,   #@@@@@@@(                
            ,%%####%(        *#%###%@@@@@@(        #@@@@@@@(                
            ,%%####%(           #%#%@@@@,          #@@@@@@@(                
            ,%%##%%%(           #%#%@@@@,          #@@@@@@@(                
            ,%%%#*              #%#%@@@@,             *%@@@(                
            .,      ,/##*.      #%#%@@@@,     ./&@#*      *`                
                ,/#%#####%%#/,  #%#%@@@@, ,/&@@@@@@@@@&\.                    
                 `*#########%%%%###%@@@@@@@@@@@@@@@@@@&*´                   
                    `*%%###########%@@@@@@@@@@@@@@&*´                        
                        `*%%%######%@@@@@@@@@@&*´                            
                            `*#%%##%@@@@@&*´                                 
                               `*%#%@&*´                                     
                                                       
     ███╗   ███╗ ██████╗██████╗         ██╗    ██╗██╗███╗   ██╗██████╗ ███████╗██╗   ██╗██████╗ ███████╗
     ████╗ ████║██╔════╝██╔══██╗        ██║    ██║██║████╗  ██║██╔══██╗██╔════╝██║   ██║██╔══██╗██╔════╝
     ██╔████╔██║██║     ██████╔╝        ██║ █╗ ██║██║██╔██╗ ██║██║  ██║███████╗██║   ██║██████╔╝█████╗  
     ██║╚██╔╝██║██║     ██╔═══╝         ██║███╗██║██║██║╚██╗██║██║  ██║╚════██║██║   ██║██╔══██╗██╔══╝  
     ██║ ╚═╝ ██║╚██████╗██║             ╚███╔███╔╝██║██║ ╚████║██████╔╝███████║╚██████╔╝██║  ██║██║     
     ╚═╝     ╚═╝ ╚═════╝╚═╝              ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     

```

**A Model Context Protocol (MCP) server for seamless Unity Editor integration with Windsurf IDE**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Unity Version](https://img.shields.io/badge/Unity-2022.3%2B-blue.svg)](https://unity3d.com/get-unity/download)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

</div>

## 🚀 Features

### 🎮 Unity Editor Integration
- **Natural Language Control**: Use conversational AI to perform complex Unity operations
- **Real-time Communication**: WebSocket-based bridge for instant responses
- **Project Management**: Comprehensive project analysis and configuration
- **Scene Manipulation**: Create, modify, and manage GameObjects and components
- **Asset Pipeline**: Automated asset import, organization, and optimization
- **Build Automation**: Configure and execute builds for multiple platforms

### 🧠 AI-Powered Workflows
- **Smart Code Generation**: Generate Unity scripts based on gameplay descriptions
- **Intelligent Scene Building**: Create complex scenes from natural language descriptions
- **Component Templates**: Auto-generate common Unity patterns and components
- **Workflow Automation**: Pre-built workflows for common Unity development tasks

### 🔧 Windsurf-Specific Features
- **Deep IDE Integration**: Seamless integration with Windsurf's AI coding patterns
- **Code Context Analysis**: Understand current code context for better suggestions
- **Live Sync**: Real-time synchronization between Windsurf and Unity editors
- **Enhanced Error Handling**: Robust error recovery and user guidance

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Available Tools](#available-tools)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Requirements

### Unity Editor
- Unity 2022.3 LTS or later
- Unity Package Manager access

### Node.js Environment
- Node.js 18 or later
- npm 9 or later

### Windsurf IDE
- Windsurf IDE with MCP support
- MCP configuration capability

## 📦 Installation

### Step 1: Install Unity Package

1. Open Unity Package Manager (Window > Package Manager)
2. Click the "+" button and select "Add package from git URL"
3. Enter: `https://github.com/isekream/Windsurf_Unity_MCP.git?path=/Unity`
4. Click "Add"

### Step 2: Install Node.js Server

```bash
# Install globally via npm
npm install -g @windsurf/unity-mcp

# Or install locally in your project
npm install @windsurf/unity-mcp
```

### Step 3: Configure Windsurf

Add to your Windsurf MCP configuration:

```json
{
  "mcpServers": {
    "unity": {
      "command": "node",
      "args": ["path/to/windsurf-unity-mcp/build/index.js"],
      "env": {
        "UNITY_PORT": "8090",
        "REQUEST_TIMEOUT": "10"
      }
    }
  }
}
```

## ⚙️ Configuration

### Unity Configuration

1. Open Unity Editor
2. Navigate to **Tools > Windsurf MCP > Server Window**
3. Configure WebSocket port (default: 8090)
4. Set request timeout (default: 10 seconds)
5. Click "Start Server"

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `UNITY_PORT` | WebSocket port for Unity communication | `8090` |
| `REQUEST_TIMEOUT` | Request timeout in seconds | `10` |
| `LOG_LEVEL` | Logging level (debug, info, warn, error) | `info` |

## 🎯 Usage

### Basic Commands

Once configured, you can use natural language commands in Windsurf:

```
"Create a player character with movement controls"
"Add a particle system for fire effects"
"Set up a 2D platformer scene with platforms"
"Generate a script for enemy AI behavior"
"Configure build settings for mobile platforms"
```

### Advanced Workflows

```
"Analyze my current Unity project and suggest optimizations"
"Create a complete UI system for a game menu"
"Set up physics-based vehicle controls"
"Generate procedural terrain with textures"
"Configure post-processing effects for better visuals"
```

## 🛠️ Available Tools

### Project Management
- `analyze_project` - Analyze Unity project structure
- `get_project_info` - Get project settings and configuration
- `set_project_settings` - Modify project configuration
- `list_scenes` - List all scenes in the project

### Scene Operations
- `create_gameobject` - Create and configure GameObjects
- `modify_component` - Add, remove, or update components
- `query_scene` - Get scene hierarchy and object details
- `select_objects` - Select and focus objects in the scene

### Asset Management
- `import_asset` - Import files with custom settings
- `create_material` - Generate materials with properties
- `manage_prefabs` - Create and modify prefab assets
- `organize_assets` - Folder operations and organization

### Code Generation
- `create_script` - Generate C# scripts with templates
- `analyze_scripts` - Parse existing scripts for context
- `attach_scripts` - Attach scripts to GameObjects
- `find_references` - Find script and component usage

### Build & Deploy
- `configure_build` - Set build settings and targets
- `execute_build` - Trigger builds for platforms
- `run_tests` - Execute Unity Test Runner
- `package_manager` - Install and update packages

## 💡 Examples

### Creating a Character Controller

```
User: "Create a third-person character controller with camera follow"

AI Response: I'll create a complete third-person character controller for you:

1. Creating the player GameObject with required components
2. Adding character controller physics
3. Setting up camera follow system
4. Generating movement script with WASD controls
5. Configuring animations and input handling

[Executes via MCP tools...]

✅ Created PlayerController with:
   - CharacterController component
   - ThirdPersonMovement script
   - CameraFollow system
   - Input handling for movement and camera
```

### Setting Up a Game Scene

```
User: "Set up a basic platformer level with platforms, enemies, and collectibles"

AI Response: Creating a platformer level with all requested elements:

1. Setting up level geometry with platforms
2. Adding enemy spawn points with AI behavior
3. Placing collectible items with pickup scripts
4. Configuring physics and collision layers
5. Setting up lighting and visual effects

[Executes via MCP tools...]

✅ Platformer level created with:
   - 12 platforms with varying heights
   - 5 enemy spawn points with patrol AI
   - 15 collectible coins with pickup effects
   - Proper collision layers and physics
```

## 🔨 Development

### Prerequisites

```bash
# Clone the repository
git clone https://github.com/isekream/Windsurf_Unity_MCP.git
cd Windsurf_Unity_MCP

# Install dependencies
npm install
```

### Project Structure

```
windsurf-unity-mcp/
├── Unity/                          # Unity Package
│   ├── Editor/                     # Unity Editor scripts
│   │   ├── McpUnityServer.cs      # Main server coordinator
│   │   ├── Tools/                  # MCP tool implementations
│   │   └── UI/                     # Editor UI components
│   ├── Runtime/                    # Runtime scripts
│   └── package.json               # Unity package manifest
├── Server/                         # Node.js MCP Server
│   ├── src/                       # TypeScript source code
│   │   ├── index.ts              # Main entry point
│   │   ├── tools/                # Tool implementations
│   │   ├── unity-client.ts       # Unity WebSocket client
│   │   └── schemas/              # Zod validation schemas
│   ├── build/                    # Compiled JavaScript
│   └── package.json              # Node.js dependencies
├── docs/                          # Documentation
├── examples/                      # Example projects
└── tests/                         # Test suites
```

### Building the Project

```bash
# Build TypeScript to JavaScript
npm run build

# Run in development mode with hot reload
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Unity Development

1. Open Unity Editor
2. Import the Unity package from `/Unity` folder
3. Navigate to **Tools > Windsurf MCP > Development Window**
4. Enable development mode for detailed logging
5. Test MCP tools directly from the Unity interface

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

### Manual Testing

1. Start Unity Editor with the package installed
2. Start the MCP server in development mode
3. Configure Windsurf to connect to the local server
4. Test various commands and workflows

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) for the protocol specification
- [Unity Technologies](https://unity.com/) for the game engine
- [Windsurf](https://codeium.com/windsurf) for the AI-powered IDE
- [CoderGamester/mcp-unity](https://github.com/CoderGamester/mcp-unity) for inspiration

## 🆘 Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/isekream/Windsurf_Unity_MCP/issues)
- 💬 [Discussions](https://github.com/isekream/Windsurf_Unity_MCP/discussions)
- 📧 [Email Support](mailto:support@yourdomain.com)

---

<div align="center">
Made with ❤️ for Unity developers using Windsurf IDE
</div> 