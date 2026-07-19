import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { FileUp, Loader2, AlertCircle, CheckCircle2, Upload } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const WEBHOOK_URL = "https://hook.us2.make.com/4lw43l1z2ys5f5vh9wo5kojxgg3hkkpy";

function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [drawingId, setDrawingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Por favor, selecione um arquivo PDF.");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResponse(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] ?? null;
    if (droppedFile && droppedFile.type !== "application/pdf") {
      setError("Por favor, arraste um arquivo PDF.");
      return;
    }
    setFile(droppedFile);
    setError(null);
    setResponse(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    if (!file) {
      setError("Selecione um arquivo PDF para continuar.");
      return;
    }
    if (!drawingId.trim()) {
      setError("Informe o ID do Desenho.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("arquivo_desenho", file);
      formData.append("desenho_id", drawingId.trim());

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Erro no servidor (${res.status}). Tente novamente em alguns instantes.`);
      }

      const data = (await res.json()) as object;
      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível conectar ao serviço de análise. Verifique sua conexão e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileUp className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Análise de Desenho Técnico
          </h1>
          <p className="mt-2 text-muted-foreground">
            Envie o PDF do desenho e informe o ID para obter a análise automática.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-8 shadow-sm"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="drawing-id" className="mb-2 block text-sm font-medium text-foreground">
                ID do Desenho
              </label>
              <input
                id="drawing-id"
                type="text"
                value={drawingId}
                onChange={(e) => setDrawingId(e.target.value)}
                placeholder="Ex: 5736940-1"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Arquivo PDF</label>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors hover:bg-muted/50"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {file ? file.name : "Clique ou arraste o PDF aqui"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Apenas arquivos PDF</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                "Analisar Desenho"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-destructive">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {response !== null && !isLoading && (
            <div className="mt-6">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Resposta da análise
              </div>
              <pre className="max-h-96 overflow-auto rounded-xl border border-border bg-muted p-4 text-xs text-foreground">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
