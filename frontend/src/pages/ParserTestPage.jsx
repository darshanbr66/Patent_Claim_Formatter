import { useState } from "react";

import {
  parsePatentXml,
  extractPatent,
} from "../services/parser";

export default function ParserTestPage() {
  const [message, setMessage] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const xml = await file.text();

      const parsedXml = parsePatentXml(xml);

      const root = parsedXml["us-patent-grant"];

      const biblio = root["us-bibliographic-data-grant"];
      console.clear();

      console.log("======================================");
      console.log("BIBLIOGRAPHIC DATA");
      console.dir(biblio, { depth: null });

      console.log("======================================");

      const patent = extractPatent(parsedXml);

      

      console.log("========================================");
      console.log("PATENT OBJECT");
      console.log(patent);

      console.log("========================================");
      console.log("DOCUMENT");
      console.log(patent.document);

      console.log("========================================");
      console.log("PARTIES");
      console.log(patent.parties);

      console.log("========================================");
      console.log(parsedXml["us-patent-grant"]["us-bibliographic-data-grant"].parties);

      console.log("========================================");
      console.log("CLASSIFICATIONS");
      console.log(patent.classifications);

      console.log("========================================");
      console.log("RELATIONSHIPS");
      console.log(patent.relationships);

      console.log("========================================");
      console.log("DESCRIPTION");
      console.log(patent.description);

      console.log("========================================");
      console.log("DRAWINGS");
      console.log(patent.drawings);

      console.log("========================================");
      console.log("CLAIMS");
      console.log(patent.claims);

      setMessage(
        "Patent parsed successfully. Open Developer Tools (F12) and inspect the console."
      );
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        Patent Parser Playground
      </h1>

      <p className="mb-8 text-slate-600">
        Upload a USPTO XML patent document to inspect the normalized patent
        object produced by the parser.
      </p>

      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        className="block w-full rounded-lg border border-slate-300 p-3"
      />

      <p className="mt-6 text-sm text-slate-600">
        {message}
      </p>
    </div>
  );
}