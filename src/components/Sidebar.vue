<style scoped>
@import '@/assets/css/admin.css';
</style>

<template>
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <router-link to="/MyCompany">
          <img
            src="@/assets/img/dlh2.png"
            class="img-fluid logo"
            alt=""
            style="max-width: 80%; height: auto"
          />
        </router-link>
        <router-link to="/MyCompany">
          <img
            src="@/assets/img/dlh2.png"
            class="img-fluid logo-small"
            alt=""
          />
        </router-link>
      </div>
      <div class="siderbar-toggle">
        <label class="switch" id="toggle_btn">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <div class="sidebar-inner slimscroll">
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <li class="menu-title m-0">
            <h6>Home</h6>
          </li>
          <li>
            <router-link :to="dashboardRoute" activeClass="active">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
