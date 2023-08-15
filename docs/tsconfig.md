# TypeScript Configuration

We utilize two TypeScript configuration files:
- [tsconfig.json](../tsconfig.json), which is employed by both the IDE and Jest.
- [tsconfig.build.json](../tsconfig.build.json), that is utilized by Next.js.

For most modifications, your focus should be on the `tsconfig.json` file. Only when it's necessary to add or override certain properties specifically for Next.js should you alter the `tsconfig.build.json` file.
