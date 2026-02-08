```angular-ts showLineNumbers copyButton
import { Component } from "@angular/core";
import { AiCommandItemConfig } from "../command.config";
import { AiCommandImports } from "../command.imports";

@Component({
    imports: [AiCommandImports],
    template: `
        <ai-command class="md:min-w-125" (selectedCommand)="handleCommand($event)">
            <ai-command-input placeholder="Search actions, files, and more..." />

            <ai-command-list>
                <ai-command-empty />

                <ai-command-item-group label="Quick Actions">
                    <ai-command-item label="Create new project" value="new-project" icon="folder" shortcut="⌘N" />
                    <ai-command-item label="Open file" value="open-file" icon="folder-open" shortcut="⌘O" />
                    <ai-command-item label="Save all" value="save-all" icon="save-2" shortcut="⌘S" />
                </ai-command-item-group>

                <ai-command-separator />

                <ai-command-item-group label="Navigation">
                    <ai-command-item label="Go to Dashboard" value="dashboard" icon="dashboard" shortcut="⌘1" />
                    <ai-command-item label="Go to Projects" value="projects" icon="folder" shortcut="⌘2" />
                </ai-command-item-group>

                <ai-command-separator />

                <ai-command-item-group label="Tools">
                    <ai-command-item label="Open terminal" value="terminal" icon="terminal" shortcut="⌘T" />
                    <ai-command-item label="Toggle theme" value="theme" icon="moon" shortcut="⌘D" />
                </ai-command-item-group>
            </ai-command-list>
        </ai-command>
    `,
    host: {
        "(window:keydown)": "handleKeydown($event)",
    },
})
export class DemoCommandDefaultComponent {
    private readonly commandActions: Record<string, () => void> = {
        "new-project": () => this._showAlert("Creating new project..."),
        "open-file": () => this._showAlert("Opening file dialog..."),
        "save-all": () => this._showAlert("Saving all files..."),
        dashboard: () => this._showAlert("Navigating to Dashboard..."),
        projects: () => this._showAlert("Navigating to Projects..."),
        terminal: () => this._showAlert("Opening terminal..."),
        theme: () => this._showAlert("Toggling theme..."),
    };

    private readonly keyMap: Record<string, { value: string; label: string }> = {
        n: { value: "new-project", label: "Create new project" },
        o: { value: "open-file", label: "Open file" },
        s: { value: "save-all", label: "Save all" },
        "1": { value: "dashboard", label: "Go to Dashboard" },
        "2": { value: "projects", label: "Go to Projects" },
        t: { value: "terminal", label: "Open terminal" },
        d: { value: "theme", label: "Toggle theme" },
    };

    handleCommand(item: AiCommandItemConfig) {
        const action = `Executed "${item.label}" (value: ${item.value})`;
        console.log(action);
        (this.commandActions[item.value as keyof typeof this.commandActions] ?? (() => this._showAlert(`Action: ${item.label}`)))();
    }

    handleKeydown(event: KeyboardEvent) {
        if (event.metaKey || event.ctrlKey) {
            const key = event.key.toLowerCase();
            if (this.keyMap[key]) {
                event.preventDefault();
                this._executeCommand(this.keyMap[key].value, this.keyMap[key].label);
            }
        }
    }

    private _executeCommand(value: string, label: string) {
        this.handleCommand({ value, label } as AiCommandItemConfig);
    }

    private _showAlert(message: string, warning = false) {
        if (warning) {
            console.warn(message);
        } else {
            console.log(message);
        }
    }
}
```
