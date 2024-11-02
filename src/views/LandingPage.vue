<template>
  <div class="landing-page">
    <header class="header">
      <nav class="navbar">
        <h1 class="logo">My Landing Page</h1>
        <ul class="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>

    <section class="hero">
      <h2>Welcome to Our Service</h2>
      <p>Your journey to excellence starts here.</p>
      <button @click="ctaClick">Get Started</button>
    </section>

    <section id="features" class="features">
      <h3>Features</h3>
      <div class="feature-cards">
        <div class="card" v-for="(feature, index) in features" :key="index">
          <h4>{{ feature.title }}</h4>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section id="about" class="about">
      <h3>About Us</h3>
      <p>
        We provide solutions for businesses and individuals seeking to excel
        in their fields. Our platform is built to help you succeed.
      </p>
    </section>

    <footer id="contact" class="footer">
      <h3>Contact Us</h3>
      <p>Email: info@example.com</p>
      <p>Phone: +123 456 789</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      features: [
        { title: "Fast Performance", description: "Enjoy lightning-fast speed with our platform." },
        { title: "Secure", description: "Your data is safe with top-notch security measures." },
        { title: "24/7 Support", description: "We’re here to help you anytime, anywhere." },
      ],
    };
  },
  methods: {
    ctaClick() {
      alert("Get started with our service!");
    },
  },
};
</script>

<style scoped>
.landing-page {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
}
.header {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
}
.nav-links a {
  color: white;
  text-decoration: none;
}
.hero {
  padding: 50px;
  background-color: #f4f4f4;
}
.hero button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
.features {
  padding: 20px;
  background-color: #e0e0e0;
}
.feature-cards {
  display: flex;
  justify-content: space-around;
}
.card {
  background-color: white;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 30%;
}
.about {
  padding: 20px;
}
.footer {
  background-color: #333;
  color: white;
  padding: 15px;
}
</style>
