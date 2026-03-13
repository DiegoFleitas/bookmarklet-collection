javascript:(() => {
  if (document.getElementById("formfiller")) return;

  const originalHost = window.location.host;
  const originalPath = window.location.pathname;

  function jsString(value) {
    return JSON.stringify(String(value));
  }

  function isVisible(el) {
    return !!(el.offsetParent || el.getClientRects().length);
  }

  function isEligibleInput(el) {
    if (!(el instanceof HTMLInputElement)) return false;
    const type = (el.type || "").toLowerCase();
    if (type === "hidden" || type === "submit" || type === "button" || type === "file" || type === "password") {
      return false;
    }
    return true;
  }

  function isEligibleElement(el) {
    if (!isVisible(el)) return false;
    if (el instanceof HTMLInputElement) return isEligibleInput(el);
    if (el instanceof HTMLTextAreaElement) return true;
    if (el instanceof HTMLSelectElement) return true;
    return false;
  }

  function buildUi() {
    const overlay = document.createElement("div");
    overlay.id = "formfiller";
    const backdrop = document.createElement("div");
    const dialog = document.createElement("section");
    const title = document.createElement("h1");
    const formWrapper = document.createElement("div");
    const autosubmitLabel = document.createElement("label");
    const autosubmitCheckbox = document.createElement("input");
    const br = document.createElement("br");
    const br2 = document.createElement("br");
    const nameInput = document.createElement("input");
    const saveButton = document.createElement("button");
    const infoPara = document.createElement("p");
    const closeButton = document.createElement("button");

    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.zIndex = "2147483646";

    backdrop.style.position = "absolute";
    backdrop.style.top = "0";
    backdrop.style.left = "0";
    backdrop.style.right = "0";
    backdrop.style.bottom = "0";
    backdrop.style.backgroundColor = "rgba(0,0,0,.25)";

    dialog.style.position = "relative";
    dialog.style.margin = "10vh auto";
    dialog.style.maxWidth = "480px";
    dialog.style.width = "90%";
    dialog.style.padding = "32px 28px";
    dialog.style.backgroundColor = "#fff";
    dialog.style.fontFamily = "'Helvetica Neue',Helvetica,Arial,sans-serif";
    dialog.style.boxShadow = "0 10px 40px rgba(15,23,42,0.35)";
    dialog.style.borderRadius = "12px";

    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "formfiller-title");

    title.id = "formfiller-title";
    title.textContent = "Form Filler";
    title.style.margin = "0 0 18px";
    title.style.fontSize = "28px";

    formWrapper.id = "formfiller-formwrapper";

    autosubmitCheckbox.type = "checkbox";
    autosubmitCheckbox.id = "formfiller-autosubmit";
    autosubmitCheckbox.value = "true";
    autosubmitLabel.appendChild(autosubmitCheckbox);
    autosubmitLabel.appendChild(document.createTextNode(" Submit form after filling"));

    nameInput.id = "formfiller-bookmarkletname";
    nameInput.value = document.title || "Saved form";
    nameInput.style.display = "block";
    nameInput.style.width = "100%";
    nameInput.style.margin = "16px 0";
    nameInput.style.padding = "6px 8px";

    saveButton.textContent = "Save";
    saveButton.type = "button";
    saveButton.style.padding = "6px 14px";
    saveButton.style.cursor = "pointer";

    infoPara.id = "formfiller-info";
    infoPara.style.margin = "16px 0 0";
    infoPara.style.fontSize = "13px";
    infoPara.style.color = "#555";

    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.textContent = "×";
    closeButton.style.position = "absolute";
    closeButton.style.top = "6px";
    closeButton.style.right = "10px";
    closeButton.style.fontSize = "22px";
    closeButton.style.border = "none";
    closeButton.style.background = "transparent";
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "#888";

    formWrapper.appendChild(autosubmitLabel);
    formWrapper.appendChild(br);
    formWrapper.appendChild(br2);
    formWrapper.appendChild(nameInput);
    formWrapper.appendChild(saveButton);

    dialog.appendChild(closeButton);
    dialog.appendChild(title);
    dialog.appendChild(formWrapper);
    dialog.appendChild(infoPara);

    overlay.appendChild(dialog);
    overlay.appendChild(backdrop);
    document.body.appendChild(overlay);

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
    }

    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }

    backdrop.addEventListener("click", close);
    closeButton.addEventListener("click", close);
    document.addEventListener("keydown", onKey);

    nameInput.focus();

    return {
      autosubmitCheckbox,
      nameInput,
      saveButton,
      infoPara,
      close
    };
  }

  function collectFields() {
    const forms = Array.from(document.forms);
    const fields = [];
    const nameCounts = new Map();

    forms.forEach((form, formIndex) => {
      const elements = Array.from(form.elements);
      elements.forEach((el) => {
        if (!isEligibleElement(el)) return;
        const name = el.name || "";
        const id = el.id || "";
        const type = (el.type || "").toLowerCase();

        if (name) {
          nameCounts.set(name, (nameCounts.get(name) || 0) + 1);
        }

        if (el instanceof HTMLInputElement) {
          if (type === "radio" || type === "checkbox") {
            if (!el.checked) return;
          }
        }

        if (el instanceof HTMLSelectElement && el.multiple) {
          const selectedValues = Array.from(el.options)
            .filter((opt) => opt.selected)
            .map((opt) => opt.value);
          fields.push({
            formIndex,
            id,
            name,
            kind: "select-multiple",
            values: selectedValues
          });
          return;
        }

        if (el instanceof HTMLInputElement) {
          const t = (el.type || "").toLowerCase();
          if (t === "radio" || t === "checkbox") {
            fields.push({
              formIndex,
              id,
              name,
              kind: t,
              value: el.value
            });
            return;
          }
        }

        const value = el.value;
        if (value == null) return;
        fields.push({
          formIndex,
          id,
          name,
          kind: "value",
          value
        });
      });
    });

    const ambiguousNames = Array.from(nameCounts.entries())
      .filter(([, count]) => count > 1)
      .map(([name]) => name);

    return { fields, ambiguousNames };
  }

  function buildBookmarkletCode(fields, autosubmit) {
    const lines = [];
    lines.push("(function(){");
    lines.push("const originalHost=" + jsString(originalHost) + ";");
    lines.push("const originalPath=" + jsString(originalPath) + ";");
    lines.push("if(location.host!==originalHost){return;}");
    lines.push(
      "if(!location.pathname.startsWith(originalPath)){if(!confirm('This saved form was created for '+originalHost+originalPath+' but you are at '+location.host+location.pathname+'. Run it anyway?')){return;}}"
    );
    lines.push("const d=document;");
    lines.push("function change(el){el.dispatchEvent(new Event('change',{bubbles:true}));}");
    lines.push("function byId(id){return d.getElementById(id);}"); // prefer id when available

    const groupedByForm = new Map();
    fields.forEach((field) => {
      if (!groupedByForm.has(field.formIndex)) {
        groupedByForm.set(field.formIndex, []);
      }
      groupedByForm.get(field.formIndex).push(field);
    });

    groupedByForm.forEach((formFields, formIndex) => {
      lines.push(";(function(){");
      lines.push("const f=d.forms[" + formIndex + "];");
      lines.push("if(!f)return;");
      formFields.forEach((field) => {
        if (field.kind === "select-multiple") {
          const valuesArray = "[" + field.values.map(jsString).join(",") + "]";
          if (field.id) {
            lines.push(
              "var el=byId(" + jsString(field.id) + ");if(el){var vals=" +
                valuesArray +
                ";for(var i=0;i<el.options.length;i++){var o=el.options[i];o.selected=vals.indexOf(o.value)!==-1;}change(el);}"
            );
          } else if (field.name) {
            lines.push(
              "var eln=f.elements[" +
                jsString(field.name) +
                "];if(eln&&eln.tagName==='SELECT'){var vals=" +
                valuesArray +
                ";for(var i=0;i<eln.options.length;i++){var o=eln.options[i];o.selected=vals.indexOf(o.value)!==-1;}change(eln);}"
            );
          }
        } else if (field.kind === "radio" || field.kind === "checkbox") {
          const selectorParts = [];
          selectorParts.push("input[type='" + field.kind + "']");
          if (field.name) selectorParts.push("[name=" + jsString(field.name).slice(1, -1) + "]");
          selectorParts.push("[value=" + jsString(field.value).slice(1, -1) + "]");
          const selector = selectorParts.join("");
          lines.push(
            "var el=d.querySelector(" +
              jsString(selector) +
              ");if(el){el.checked=true;change(el);}"
          );
        } else if (field.kind === "value") {
          const v = jsString(field.value);
          if (field.id) {
            lines.push(
              "var el=byId(" + jsString(field.id) + ");if(el){el.value=" + v + ";change(el);}"
            );
          } else if (field.name) {
            lines.push(
              "var eln=f.elements[" +
                jsString(field.name) +
                "];if(eln){eln.value=" +
                v +
                ";change(eln);}"
            );
          }
        }
      });
      if (autosubmit) {
        lines.push("if(f){f.submit();}");
      }
      lines.push("})();");
    });

    lines.push("})();");
    return "javascript:" + encodeURIComponent(lines.join(""));
  }

  const ui = buildUi();
  const { fields, ambiguousNames } = collectFields();

  if (!fields.length) {
    ui.infoPara.textContent = "No eligible form fields found on this page.";
    ui.saveButton.disabled = true;
    return;
  }

  if (ambiguousNames.length) {
    ui.infoPara.textContent =
      "Note: some fields share the same name (" +
      ambiguousNames.slice(0, 5).join(", ") +
      (ambiguousNames.length > 5 ? ", ..." : "") +
      "), so behavior may be approximate.";
  } else {
    ui.infoPara.textContent =
      "A new bookmarklet will be generated that only runs on this site and autofills the current form values (excluding passwords).";
  }

  ui.saveButton.addEventListener("click", () => {
    const autosubmit = ui.autosubmitCheckbox.checked;
    const code = buildBookmarkletCode(fields, autosubmit);
    let link = document.getElementById("bookmarklet");
    if (!link) {
      link = document.createElement("a");
      link.id = "bookmarklet";
      link.textContent = ui.nameInput.value || "My bookmarklet";
      link.style.display = "inline-block";
      link.style.marginTop = "12px";
      link.style.textDecoration = "underline";
      link.style.cursor = "grab";
      ui.infoPara.appendChild(document.createElement("br"));
      ui.infoPara.appendChild(document.createTextNode("Drag this link to your bookmarks bar: "));
      ui.infoPara.appendChild(link);
    }
    link.href = code;
    link.textContent = ui.nameInput.value || "My bookmarklet";
  });
})(); 
