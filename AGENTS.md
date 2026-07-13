## Dev server / localhost rules

The user wants to open and test the app inside Codex via localhost/preview.

Rules:

* You may start the dev server when needed for preview.
* Do not restart the dev server after every small change.
* If the dev server is already running, reuse it.
* Before starting a new dev server, check whether the target port is already in use.
* If the port is busy, do not kill the process automatically. Explain the situation first.
* Avoid infinite restart loops.
* Prefer hot reload when available.
* Use lint/typecheck/build for code verification when possible.
* Use the dev server mainly for visual/browser verification.
* After starting the server, provide the localhost URL that should be opened in preview.
* If the server crashes, read the error, explain the cause, apply the smallest fix, then restart once.
