# FerricCP: VS Code Integration

A high-performance VS Code extension for **FerricCP**, a compiler frontend and static analysis engine designed to detect Competitive Programming (CP) specific semantic and syntactic issues before compilation.

This repository contains the **Language Server Protocol (LSP) client**, responsible for connecting the VS Code user interface with the native Rust analysis engine.

> **Note:** This repository only contains the VS Code extension. The compiler frontend, semantic analyzer, Symbol Table, and query engine are implemented in the main FerricCP repository.

---

# Motivation

Traditional C++ compilers such as GCC and Clang validate syntax and type correctness but are unaware of many competitive programming mistakes that frequently lead to **Wrong Answer (WA)**, **Time Limit Exceeded (TLE)**, or undefined behavior.

General-purpose static analyzers such as Clang-Tidy provide extensive diagnostics but are not designed for the fast feedback loop required during programming contests.

FerricCP fills this gap by providing lightweight, state-aware static analysis directly inside the editor with minimal latency.

---

# Features

- Detects Competitive Programming specific issues including:
  - use-before-initialization
  - variable shadowing
  - unsafe numeric conversions
  - floating-point precision misuse
  - inefficient language constructs

- Supports macro-aware semantic analysis by tracking `#define` directives and aliases without relying on a preprocessing stage.

- Provides precise editor diagnostics through a custom coordinate translation layer that maps native Tree-sitter byte offsets into VS Code text positions.

- Uses asynchronous JSON-RPC communication over standard I/O, ensuring analysis executes independently of the editor's main event loop.

- Designed to support runtime-extensible rule sets without requiring recompilation of the extension.

---

# Architecture

The extension serves as a lightweight Language Server Protocol client implemented with the `vscode-languageclient` API.

The execution pipeline is:

1. Saving a `.cpp` file triggers a `textDocument/didSave` notification.

2. The extension forwards the request to the FerricCP Rust backend using JSON-RPC over standard input/output.

3. The Rust engine parses the source using Tree-sitter, constructs a Concrete Syntax Tree (CST), performs semantic analysis using its Symbol Table, and generates diagnostics.

4. Diagnostics are returned through the Language Server Protocol and rendered natively by VS Code.

---

# Installation

1. Build the FerricCP Rust analysis engine.

2. Ensure the executable is accessible by the extension.

3. Install the extension (Marketplace or local `.vsix` package).

4. Open any C++ source file.

5. Save the file to automatically trigger semantic analysis.

---

# Configuration

FerricCP supports configurable rule definitions through YAML.

New rules can be added by placing YAML files inside the appropriate rule directory without modifying the extension itself. The backend loads these rule definitions during initialization and compiles them into native Tree-sitter queries.

---

# Technologies

- TypeScript
- VS Code Extension API
- Language Server Protocol (LSP)
- JSON-RPC
- Tree-sitter
- Rust

---

Designed for competitive programming workflows where fast, accurate semantic feedback is essential.