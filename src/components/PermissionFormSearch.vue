<template>
    <div class="form-search">
      <!-- Filter Form and Add User Button -->
      <div class="main d-flex justify-content-between mb-3">
        <!-- Search Form -->
        <form class="form-inline d-flex">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search by name"
              aria-label="Search"
            />
            <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-search"></i>
                </span>
              </div>
          </div>
        </form>
      
      <a href="add-permission">
        <button class="btn btn" data-toggle="modal" data-target=".bd-example-modal-lg" style="background-color:#075d80; color:white;">
          Add Permission
        </button>
      </a> 
      </div>
    </div>
</template>

<script>
 
</script>

<style lang="scss" scoped>

</style>