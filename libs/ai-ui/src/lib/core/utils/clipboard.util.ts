export class ClipboardUtil {
    /**
     * Copia um valor simples ou objeto para o clipboard
     * @param value
     * @returns Promise<void>
     */
    static async copy(value: string | number | object): Promise<void> {
        let code = "";

        if (typeof value === "object") {
            code = JSON.stringify(value, null, 4);
        } else {
            code = String(value);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard
                .writeText(code)
                .then(() => console.log("📋 Copiado:", code))
                .catch(err => {
                    console.error("❌ Falha ao copiar com Clipboard API:", err);
                    return this.fallbackCopy(code);
                });
        } else {
            return this.fallbackCopy(code);
        }
    }

    /**
     * Método fallback para copiar usando execCommand (suporte a navegadores antigos)
     * @param text
     * @returns Promise<void>
     */
    private static fallbackCopy(text: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            textarea.style.top = "0";
            textarea.style.left = "0";
            textarea.style.opacity = "0";
            textarea.style.pointerEvents = "none";

            document.body.appendChild(textarea);

            try {
                textarea.focus();
                textarea.select();

                const successful = document.execCommand("copy");

                if (successful) {
                    console.log("📋 Copiado (fallback):", text);
                    resolve();
                } else {
                    console.error("❌ Falha ao copiar com execCommand");
                    reject(new Error("Falha ao copiar texto"));
                }
            } catch (err) {
                console.error("❌ Erro ao copiar:", err);
                reject(err);
            } finally {
                document.body.removeChild(textarea);
            }
        });
    }
}
