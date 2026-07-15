import {
  MAX_FILE_SIZE_BYTES,
  MAX_FILE_SIZE_MB,
  SUPPORTED_EXTENSIONS,
} from "../constants/fileConfig";

export function validatePatentFile(files) {
  if (!files || files.length === 0) {
    return {
      isValid: false,
      message: "",
      file: null,
    };
  }

  if (files.length > 1) {
    return {
      isValid: false,
      message: "Please select only one file.",
      file: null,
    };
  }

  const file = files[0];

  const extension = "." + file.name.split(".").pop().toLowerCase();

  if (!SUPPORTED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      message: `Unsupported file type. Allowed: ${SUPPORTED_EXTENSIONS.join(
        ", "
      )}`,
      file: null,
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      message: `Maximum file size is ${MAX_FILE_SIZE_MB} MB.`,
      file: null,
    };
  }

  return {
    isValid: true,
    message: "",
    file,
  };
}

export function formatFileSize(bytes) {
  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
}