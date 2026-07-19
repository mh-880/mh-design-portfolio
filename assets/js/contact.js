/* ==========================================
   Contact Form Validation
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");

    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const privacyInput = document.getElementById("privacy");

    const agreementError =
        document.querySelector(".agreement-error");

    const submitButton =
        form.querySelector("button[type='submit']");

    /* -----------------------------
       共通関数
    ----------------------------- */

    function showError(input, message) {

        const wrapper = input.closest(".form-input");

        if (!wrapper) return;

        const error =
            wrapper.querySelector(".error-message");

        input.classList.add("input-error");

        if (error) {
            error.textContent = message;
        }

    }

    function clearError(input) {

        const wrapper = input.closest(".form-input");

        if (!wrapper) return;

        const error =
            wrapper.querySelector(".error-message");

        input.classList.remove("input-error");

        if (error) {
            error.textContent = "";
        }

    }

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

    /* -----------------------------
       入力チェック
    ----------------------------- */

    function validateForm() {

        let valid = true;
        let firstError = null;

        /* 名前 */

        if (nameInput.value.trim() === "") {

            showError(nameInput, "お名前を入力してください。");

            if (!firstError) firstError = nameInput;

            valid = false;

        } else {

            clearError(nameInput);

        }

        /* メール */

        if (emailInput.value.trim() === "") {

            showError(emailInput, "メールアドレスを入力してください。");

            if (!firstError) firstError = emailInput;

            valid = false;

        }

        else if (!validateEmail(emailInput.value.trim())) {

            showError(emailInput,
                "メールアドレスの形式が正しくありません。");

            if (!firstError) firstError = emailInput;

            valid = false;

        }

        else {

            clearError(emailInput);

        }

        /* 内容 */

        if (messageInput.value.trim() === "") {

            showError(messageInput,
                "お問い合わせ内容を入力してください。");

            if (!firstError) firstError = messageInput;

            valid = false;

        }

        else {

            clearError(messageInput);

        }

        /* プライバシーポリシー */

        if (!privacyInput.checked) {

            agreementError.textContent =
                "プライバシーポリシーへの同意が必要です。";

            if (!firstError) firstError = privacyInput;

            valid = false;

        }

        else {

            agreementError.textContent = "";

        }

        /* エラー位置へスクロール */

        if (!valid && firstError) {

            firstError.scrollIntoView({

                behavior: "smooth",
                block: "center"

            });

        }

        return valid;

    }

    /* -----------------------------
       リアルタイムチェック
    ----------------------------- */

    nameInput.addEventListener("input", () => {

        if (nameInput.value.trim() !== "") {

            clearError(nameInput);

        }

    });

    emailInput.addEventListener("input", () => {

        if (validateEmail(emailInput.value.trim())) {

            clearError(emailInput);

        }

    });

    messageInput.addEventListener("input", () => {

        if (messageInput.value.trim() !== "") {

            clearError(messageInput);

        }

    });

    privacyInput.addEventListener("change", () => {

        agreementError.textContent = "";

    });

    /* -----------------------------
       Submit
    ----------------------------- */

    form.addEventListener("submit", (e) => {

        if (!validateForm()) {

            e.preventDefault();
            return;

        }

        submitButton.disabled = true;

        submitButton.textContent = "送信中...";

        /*
            e.preventDefault() を書かないことで
            FormspreeへそのままPOSTされる
        */

    });

});