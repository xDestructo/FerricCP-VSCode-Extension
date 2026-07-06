import * as path from 'path';
import { ExtensionContext, window } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    const serverPath = context.asAbsolutePath(
        path.join('bin', process.platform === 'win32' ? 'ferric_cp.exe' : 'ferric_cp')
    );
    const rulesPath = context.asAbsolutePath('rules'); 

    const serverOptions: ServerOptions = {
        run: { command: serverPath, args: ['lsp', '--rules', rulesPath] },
        debug: { command: serverPath, args: ['lsp', '--rules', rulesPath] }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'cpp' }]
    };

    client = new LanguageClient(
        'ferriccpLsp',
        'FerricCP Language Server',
        serverOptions,
        clientOptions
    );

    client.start();
    window.showInformationMessage("FerricCP running");
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}