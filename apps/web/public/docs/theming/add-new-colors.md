```css title="styles.css"
@theme {
    --color-popover: oklch(1 0 0);
    --color-popover-foreground: oklch(0.145 0 0);
}

@theme dark {
    --color-popover: oklch(0.205 0 0);
    --color-popover-foreground: oklch(0.985 0 0);
}
```

```html
<div class="bg-popover">
    <span class="text-popover-foreground">Popover personalizado.</span>
</div>
```
