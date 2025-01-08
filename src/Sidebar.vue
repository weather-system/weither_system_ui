<script>
export default {
  name: 'AppSidebar',
};
</script>

<template>
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <a href="index.html">
          <img src="assets/img/logo.svg" class="img-fluid logo" alt="" />
        </a>
        <a href="index.html">
          <img
            src="assets/img/logo-small.svg"
            class="img-fluid logo-small"
            alt=""
          />
        </a>
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
            <a href="index.html" class="active"
              ><i class="fe fe-grid"></i> <span>Dashboard</span></a
            >
          </li>
          <li class="menu-title">
            <h6>Menu</h6>
          </li>
          <li>
            <a href="services.html"
              ><i class="fe fe-briefcase"></i>
              <span>Analisis</span>
            </a>
          </li>
          <li>
            <a href="services.html"
              ><i class="fe fe-briefcase"></i>
              <span>Report</span>
            </a>
          </li>
        
          <li>
            <a href="signin.html"
              ><i class="fe fe-log-out"></i> <span>Logout</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- /Sidebar -->
</template>
