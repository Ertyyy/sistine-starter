import { spawn } from "node:child_process";

const cleanEnv = { ...process.env };

for (const key of [
  "npm_config_verify_deps_before_run",
  "NPM_CONFIG_VERIFY_DEPS_BEFORE_RUN",
  "npm_config__jsr_registry",
  "NPM_CONFIG__JSR_REGISTRY",
]) {
  if (key in cleanEnv) {
    delete cleanEnv[key];
  }
}

// const child = spawn("next", ["dev"], {
//   stdio: "inherit",
//   env: cleanEnv,
// });


// const isWin = process.platform === "win32";

// const child = spawn(
//   isWin ? "pnpm.cmd" : "pnpm",
//   ["exec", "next", "dev"],
//   {
//     stdio: "inherit",
//     env: cleanEnv,
//   }
// );


const isWin = process.platform === "win32";

const child = spawn(
  isWin ? "cmd.exe" : "pnpm",
  isWin ? ["/d", "/s", "/c", "pnpm exec next dev"] : ["exec", "next", "dev"],
  {
    stdio: "inherit",
    env: cleanEnv,
    shell: false, // 这里我们在 Windows 直接用 cmd.exe 了，不需要 shell:true
  }
);



child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
