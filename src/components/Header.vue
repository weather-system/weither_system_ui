<style scoped>
@import '@/assets/css/admin.css';
</style>

<template>
  <div class="header">
    <div class="header-left">
      <a href="index.html" class="logo">
        <img src="@/assets/img/dlh2.png" alt="Logo" width="30" height="30" />
      </a>
      <a href="index.html" class="logo-small">
        <img
          src="@/assets/img/dlh2.png"
          alt="Logo"
          width="50"
          height="auto"
        />
      </a>
    </div>
    <a class="mobile_btn" id="mobile_btn1" href="javascript:void(0);">
      <i class="fas fa-align-left"></i>
    </a>
    <div class="header-split">
      <div class="page-headers">
        <!-- <div class="search-bar">
          <span><i class="fe fe-search"></i></span>
          <input type="text" placeholder="Search" class="form-control" />
        </div> -->
      </div>
      <ul class="nav user-menu">
        <!-- User Menu -->
        <li class="nav-item dropdown">
          <a
            href="javascript:void(0)"
            class="user-link nav-link"
            data-bs-toggle="dropdown"
          >
            <span class="user-img">
              <img
                class="rounded-circle"
                src="@/assets/img/company.png"
                width="40"
                alt="Admin"
              />
              <span class="animate-circle"></span>
            </span>
          </a>
          <div class="dropdown-menu menu-drop-user">
            <div class="profilemenu">
              <div class="subscription-menu">
                <ul>
                  <li>
                    <router-link to="/Profile">Profile</router-link>
                  </li>
                  <li>
                    <a href="localization.html">Settings</a>
                  </li>
                </ul>
              </div>
              <div class="subscription-logout">
                <a @click="logout" href="#">Log Out</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

