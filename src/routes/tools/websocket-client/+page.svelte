<script lang="ts">
  import { browser } from "$app/environment";
  import { onDestroy } from "svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "$lib/components/ui/card/index.js";

  const title = "Interactive WebSocket Client";
  const description = "Connect to and test WebSocket servers in real-time.";

  let serverUrl = "wss://socketsbay.com/wss/v2/1/demo/";
  let messageToSend = "";
  let messages: { type: 'sent' | 'received' | 'status'; data: string; timestamp: string }[] = [];
  let connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected';

  let socket: WebSocket | null = null;

  function addMessage(type: 'sent' | 'received' | 'status', data: string) {
    const timestamp = new Date().toLocaleTimeString();
    messages = [...messages, { type, data, timestamp }];
  }

  function connect() {
    if (!browser || !serverUrl) return;

    connectionStatus = 'connecting';
    addMessage('status', `Menyambungkan ke ${serverUrl}...`);

    try {
        socket = new WebSocket(serverUrl);

        socket.onopen = () => {
            connectionStatus = 'connected';
            addMessage('status', "Berhasil tersambung.");
        };

        socket.onmessage = (event) => {
            addMessage('received', event.data);
        };

        socket.onerror = (event) => {
            console.error("WebSocket error:", event);
            addMessage('status', "Terjadi kesalahan koneksi.");
            connectionStatus = 'error';
        };

        socket.onclose = () => {
            connectionStatus = 'disconnected';
            addMessage('status', "Koneksi terputus.");
            socket = null;
        };
    } catch (e) {
        addMessage('status', `URL tidak valid atau terjadi kesalahan: ${e.message}`);
        connectionStatus = 'error';
    }
  }

  function disconnect() {
    if (socket) {
      socket.close();
    }
  }

  function sendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN && messageToSend) {
      socket.send(messageToSend);
      addMessage('sent', messageToSend);
      messageToSend = "";
    }
  }

  onDestroy(() => {
    if (socket) {
      socket.close();
    }
  });
</script>

<svelte:head>
  <title>{title} - MiniTools</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">{title}</h1>
    <p class="text-muted-foreground">{description}</p>
  </div>

  <hr class="border-border" />

  <Card>
    <CardHeader>
        <CardTitle>Koneksi Server</CardTitle>
    </CardHeader>
    <CardContent class="flex items-center gap-2">
      <input type="text" bind:value={serverUrl} placeholder="wss://example.com/socket" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" disabled={connectionStatus === 'connected' || connectionStatus === 'connecting'} />
      {#if connectionStatus === 'disconnected' || connectionStatus === 'error'}
        <Button on:click={connect} disabled={!serverUrl}>Sambungkan</Button>
      {:else}
        <Button variant="destructive" on:click={disconnect}>Putuskan</Button>
      {/if}
    </CardContent>
    <CardContent>
         <div class="flex items-center gap-2">
            Status:
            {#if connectionStatus === 'connected'}
                <span class="inline-flex items-center rounded-full border border-transparent bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">Tersambung</span>
            {:else if connectionStatus === 'connecting'}
                <span class="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold">Menyambungkan...</span>
            {:else if connectionStatus === 'disconnected'}
                <span class="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">Terputus</span>
            {:else}
                <span class="inline-flex items-center rounded-full border border-transparent bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">Error</span>
            {/if}
         </div>
    </CardContent>
  </Card>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Card>
      <CardHeader>
        <CardTitle>Kirim Pesan</CardTitle>
      </CardHeader>
      <CardContent>
        <form on:submit|preventDefault={sendMessage} class="space-y-4">
          <textarea bind:value={messageToSend} rows={5} class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Ketik pesan Anda di sini..." disabled={connectionStatus !== 'connected'}></textarea>
          <Button type="submit" class="w-full" disabled={connectionStatus !== 'connected' || !messageToSend}>Kirim</Button>
        </form>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Log Pesan</CardTitle>
      </CardHeader>
      <CardContent class="h-64 overflow-y-auto bg-muted p-4 rounded-md font-mono text-sm space-y-2">
        {#each messages as msg}
          <div class:text-green-500={msg.type === 'received'} class:text-blue-500={msg.type === 'sent'} class:text-gray-500={msg.type === 'status'}>
            <span class="font-sans text-xs mr-2">[{msg.timestamp}]</span>
            {#if msg.type === 'sent'}&gt;{/if}
            {#if msg.type === 'received'}&lt;{/if}
            {#if msg.type === 'status'}*{/if}
            {msg.data}
          </div>
        {:else}
            <p class="text-gray-500 font-sans text-center">Menunggu pesan...</p>
        {/each}
      </CardContent>
    </Card>
  </div>
</div>
