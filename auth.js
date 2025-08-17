// auth.js - Centralized authentication utility

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            try {
                this.currentUser = JSON.parse(loggedInUser);
                return true;
            } catch (e) {
                this.logout();
                return false;
            }
        }
        return false;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    login(userData) {
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        this.currentUser = userData;
    }

    logout() {
        localStorage.removeItem("loggedInUser");
        this.currentUser = null;
        window.location.href = "index.html";
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = "login.html";
            return false;
        }
        return true;
    }

    updateNavbar() {
        const authSection = document.getElementById("auth-section");
        if (!authSection) return;

        if (this.isLoggedIn()) {
            authSection.innerHTML = `
                <div class="user-info">
                    <span>Welcome, ${this.currentUser.name}!</span>
                    <button class="btn-logout" onclick="auth.logout()">Logout</button>
                </div>
            `;
        } else {
            authSection.innerHTML = `
                <a href="login.html" class="btn-login">Login</a>
            `;
        }
    }
}

// Global auth instance
const auth = new AuthManager();

// Initialize auth on page load
document.addEventListener("DOMContentLoaded", () => {
    auth.updateNavbar();
});
