import net from 'net';
import { $ } from 'bun';

Bun.serve({
  port: 6969,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/")
      return new Response(Bun.file(import.meta.dir + "/index.html"));
    if (url.pathname === "/toggle")
      toggle_playback_sock();
    if (url.pathname === "/next")
      next_sock();
    if (url.pathname === "/prev")
      prev_sock();
    return new Response("error 404");
  },
});

async function toggle_playback_sock() {
  await $`echo cycle pause | socat - /tmp/mpvsock`;
  console.log("toggle");
}

async function next_sock() {
  await $`echo playlist-next | socat - /tmp/mpvsock`
  console.log("next");
}

async function prev_sock() {
  await $`echo playlist-prev | socat - /tmp/mpvsock`
  console.log("prev");
}
