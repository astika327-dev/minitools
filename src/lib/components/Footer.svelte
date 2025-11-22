<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<footer class="border-t bg-muted/30 mt-auto">
  <div class="container mx-auto px-4 py-8 md:py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Brand -->
      <div class="space-y-4">
        <h3 class="text-lg font-bold tracking-tight text-foreground">Multi Tool</h3>
        <p class="text-sm text-muted-foreground max-w-xs">
          A collection of powerful, elegant utilities for developers, designers, and everyone in between.
        </p>
      </div>

      <!-- Links -->
      <div class="space-y-4">
        <h4 class="font-medium text-foreground">Categories</h4>
        <nav class="flex flex-col space-y-2 text-sm text-muted-foreground">
          <a href="/category/calculations" class="hover:text-primary transition-colors">Calculations</a>
          <a href="/category/text-content" class="hover:text-primary transition-colors">Text & Content</a>
          <a href="/category/web-security" class="hover:text-primary transition-colors">Web & Security</a>
          <a href="/category/color-design" class="hover:text-primary transition-colors">Color & Design</a>
        </nav>
      </div>

      <!-- Legal/Meta -->
      <div class="space-y-4">
        <h4 class="font-medium text-foreground">Project</h4>
        <nav class="flex flex-col space-y-2 text-sm text-muted-foreground">
          <a href="/" class="hover:text-primary transition-colors">Home</a>
          <span class="text-muted-foreground/50 cursor-not-allowed">About</span>
          <span class="text-muted-foreground/50 cursor-not-allowed">Privacy</span>
        </nav>
      </div>
    </div>

    <div class="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-xs text-muted-foreground">
        &copy; {currentYear} Multi Tool App. Built with elegance.
      </p>
      <div class="flex items-center gap-4">
        <!-- Social icons or extra links could go here -->
      </div>
    </div>
  </div>
</footer>
