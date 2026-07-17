import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDocument } from "../context/DocumentContext";
import {
  parsePatentXml,
  extractPatent,
} from "../services/parser";

const PROCESSING_STAGES = [
  {
    progress: 15,
    label: "Uploading document...",
  },
  {
    progress: 35,
    label: "Parsing USPTO XML...",
  },
  {
    progress: 60,
    label: "Extracting patent data...",
  },
  {
    progress: 85,
    label: "Preparing viewer...",
  },
  {
    progress: 100,
    label: "Finalizing...",
  },
];

export default function ProcessingPage() {
  const navigate = useNavigate();

  const { documentState, setDocumentState } = useDocument();

  const [stageIndex, setStageIndex] = useState(0);

  const currentStage = useMemo(
    () => PROCESSING_STAGES[stageIndex],
    [stageIndex]
  );

  useEffect(() => {
    if (!documentState.file) {
      navigate("/", { replace: true });
      return;
    }

    let cancelled = false;

    async function processPatent() {
      try {
        for (let i = 0; i < PROCESSING_STAGES.length; i++) {
          if (cancelled) return;

          setStageIndex(i);

          setDocumentState((prev) => ({
            ...prev,
            processingStatus: "processing",
            progress: PROCESSING_STAGES[i].progress,
          }));

          await new Promise((resolve) =>
            setTimeout(resolve, 350)
          );
        }

        const xml = await documentState.file.text();

        const parsedXml = parsePatentXml(xml);

        const patent = extractPatent(parsedXml);

        if (cancelled) return;

        setDocumentState((prev) => ({
          ...prev,
          processingStatus: "completed",
          progress: 100,
          result: patent,
        }));

        setTimeout(() => {
          navigate("/viewer", {
            replace: true,
          });
        }, 300);
      } catch (error) {
        console.error(error);

        setDocumentState((prev) => ({
          ...prev,
          processingStatus: "failed",
          result: null,
        }));
      }
    }

    processPatent();

    return () => {
      cancelled = true;
    };
  }, [
    documentState.file,
    navigate,
    setDocumentState,
  ]);

  return (
    <section className="flex w-full items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-8 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <h1 className="text-center text-3xl font-bold text-slate-900">
            Processing Patent Document
          </h1>

          <p className="mt-4 max-w-xl text-center text-slate-600">
            Please wait while your patent document is being parsed and
            prepared.
          </p>

          <div className="mt-10 w-full">
            <div className="mb-3 flex items-center justify-between text-sm font-medium">
              <span className="text-slate-700">
                {currentStage.label}
              </span>

              <span className="text-blue-600">
                {documentState.progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${documentState.progress}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-10 w-full rounded-2xl bg-slate-50 p-6">
            <div className="space-y-4">
              {PROCESSING_STAGES.map((stage, index) => {
                let status = "Pending";
                let color = "text-slate-400";

                if (index < stageIndex) {
                  status = "Completed";
                  color = "text-emerald-600";
                } else if (index === stageIndex) {
                  status = "Processing";
                  color = "text-blue-600";
                }

                return (
                  <div
                    key={stage.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-slate-700">
                      {stage.label}
                    </span>

                    <span
                      className={`text-sm font-semibold ${color}`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}