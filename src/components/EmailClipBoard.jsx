import { useEffect, useState } from "preact/hooks";

export function EmailClipBoard({ email }) {
  useEffect(() => {
    const btn = document.getElementById("copy-button");
    const defaultIcon = document.getElementById("default-icon");
    const successIcon = document.getElementById("success-icon");

    const showSuccess = () => {
      defaultIcon.classList.add("hidden");
      successIcon.classList.remove("hidden");
    };

    const resetToDefault = () => {
      defaultIcon.classList.remove("hidden");
      successIcon.classList.add("hidden");
    };

    btn.addEventListener("click", () => copiarContenido());
    const copiarContenido = async () => {
      try {
        const text = document.getElementById("copy-input").value;
        await navigator.clipboard.writeText(text);
        console.log("Contenido copiado al portapapeles");
      } catch (err) {
        console.error("Error al copiar: ", err);
      }

      showSuccess();

      // reset to default state
      setTimeout(() => {
        resetToDefault();
      }, 500);
    };
  }, []);

  return (
    <div class="w-full max-w-[16rem]">
      <div class="relative">
        <label for="copy-input" class="sr-only">
          Label
        </label>
        <input
          id="copy-input"
          type="text"
          class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={email}
          disabled
          readonly
        />

        <button
          id="copy-button"
          class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center"
        >
          <span id="default-icon">
            <svg
              class="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
          <span id="success-icon" class="hidden inline-flex items-center">
            <svg
              class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
