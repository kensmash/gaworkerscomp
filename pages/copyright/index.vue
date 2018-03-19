<template>
  <div class="page-content">
    <h2>Copyright Notice</h2>
    <p>All original graphics and content on GA WorkersComp are copyright &copy; 1998 - {{currentYear}} by William and Robert Anderson. All rights reserved. Specific features are the copyrighted material of their respective named authors. No reproduction of any material on this site is permitted without the express written permission of the copyright holders.</p>
  </div>
</template>

<script>
export default {
    computed: {
      currentYear() {
        return (new Date()).getFullYear()
      }
    }
}
</script>