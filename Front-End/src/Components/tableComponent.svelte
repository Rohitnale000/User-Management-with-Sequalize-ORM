<script>
  import { Tooltip } from "@svelte-plugins/tooltips";
  import { createEventDispatcher, onMount } from "svelte";
  import { Confirm } from "svelte-confirm";
  import Loader from "./loader.svelte";
  export let page;
  const dispatch = createEventDispatcher();
  export let totalRecords;
  export let userData;
  export let getData;
  export let pageBlockToShow;
  export let availableRecordPerPage;
  //export let searchStatus;

  //console.log(searchStatus);

  const DateFormat = (date) => {
    var d = new Date(date);
    let dateResult =
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return dateResult;
  };

  let loading = true;
  let searchValue = "";

  const handlePrev = () => {
    dispatch("prev", { message: "prev" });
  };
  const handleNext = () => {
    dispatch("next", { message: "next" });
  };
  const handlePage = (page) => {
    if (page === 0) {
      page = 1;
    } else {
      page = page;
    }
    dispatch("page", page);
  };

  onMount(() => {
    setTimeout(() => {
      loading = false;
      getData();
    }, 1000);
  });

  const handleUpdateEvent = (data) => {
    console.log(data.user_id);
    dispatch("userUpdate", data);
  };
  const handleDeleteEvent = (data) => {
    console.log(data);
    dispatch("userDelete", data.user_id);
  };

  const handleSearchEvent = () => {
    dispatch("getSingleData", { searchVal: searchValue });
  };
</script>

<!-- {#if searchStatus==="unableToFind"}
    <h3>do not found data</h3>
  {:else} -->
{#if loading}
  <Loader />
{:else}
  <div class="table-wrapper">
    <input
      type="search"
      id="search-input-sidenav"
      class="form-control col-4"
      bind:value={searchValue}
      placeholder="search by user_email"
      on:keypress={(e) => {
        if (e.key === "Enter") {
          handleSearchEvent();
        }
      }}
    />

    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Date Of Birth</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each userData as item}
          <tr>
            <td>{item.user_fname} {item.user_lname}</td>
            <td>{item.user_email}</td>
            <td>{item.user_gender}</td>
            <td
              >{item.address},{item.street}
              {item.landmark},{item.user_state}
              {item.city},{item.pincode}</td
            >
            <td>{DateFormat(item.user_date_of_birth)}</td>
            <td>
              <Confirm
                confirmTitle="Update"
                cancelTitle="Cancel"
                let:confirm={confirmThis}
              >
                <Tooltip
                  content="Update"
                  style={{ backgroundColor: "green" }}
                  animation="fade"
                  position="top"
                >
                  <a
                    href="#"
                    class="settings"
                    data-toggle="tooltip"
                    data-placement="top"
                    ><i class="material-icons"
                      on:click={() => confirmThis(handleUpdateEvent, item)}>&#xE8B8;</i></a>
                </Tooltip>

                <span slot="title"> Do you want to update this record ? </span>
                <span slot="description">
                  You won't be able to revert this!
                </span>
              </Confirm>

              <Confirm
                confirmTitle="Delete"
                cancelTitle="Cancel"
                let:confirm={confirmThis}
              >
                <!-- <i class="material-icons" >&#xE872;</i> -->

                <Tooltip
                  content="Delete"
                  style={{ backgroundColor: "red" }}
                  animation="fade"
                  position="top"
                >
                  <a href="#" class="delete"
                    ><i
                      class="material-icons"
                      on:click={() => confirmThis(handleDeleteEvent, item)}
                      >&#xE5C9;</i
                    ></a
                  >
                </Tooltip>

                <span slot="title"> Do you want to Delete this record ? </span>
                <span slot="description">
                  You won't be able to revert this!
                </span>
              </Confirm>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="clearfix">
      <div class="hint-text">
        Showing <b>{availableRecordPerPage}</b> out of <b>{totalRecords}</b> entries
      </div>
      <ul class="pagination">
        <li class="page-item disabled">
          <a
            href="#"
            on:click={() => {
              handlePrev();
              loading = true;
              setTimeout(() => {
                loading = false;
              }, 500);
            }}>Previous</a
          >
        </li>
        {#each Array(pageBlockToShow) as pbs, i}
          <li class={page === i ? "page-item active" : "page-item"}>
            <a
              href="#"
              class="page-link"
              on:click={() => {
                handlePage(i);
                loading = true;
                setTimeout(() => {
                  loading = false;
                }, 500);
              }}>{i++ + 1}</a
            >
          </li>
        {/each}

        <li class="page-item">
          <a
            href="#"
            class="page-link"
            on:click={() => {
              handleNext();
              loading = true;
              setTimeout(() => {
                loading = false;
              }, 500);
            }}>Next</a
          >
        </li>
      </ul>
    </div>
  </div>
{/if}

<style>
  .table-wrapper {
    min-width: 1000px;
    background: #fff;
    padding: 8px 25px;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  }
  table.table tr th,
  table.table tr td {
    border-color: #e9e9e9;
    padding: 12px 15px;
    vertical-align: middle;
  }
  table.table tr th:first-child {
    width: 150px;
  }
  table.table tr th:last-child {
    width: 100px;
  }
  table.table-striped tbody tr:nth-of-type(odd) {
    background-color: #fcfcfc;
  }
  table.table-striped.table-hover tbody tr:hover {
    background: #f5f5f5;
  }
  table.table th i {
    font-size: 13px;
    margin: 0 5px;
    cursor: pointer;
  }
  table.table td:last-child i {
    opacity: 0.9;
    font-size: 22px;
    margin: 0 5px;
  }
  table.table td a {
    font-weight: bold;
    color: #566787;
    display: inline-block;
    text-decoration: none;
  }
  table.table td a:hover {
    color: #2196f3;
  }
  table.table td a.settings {
    color: #2196f3;
  }
  table.table td a.delete {
    color: #f44336;
  }
  table.table td i {
    font-size: 19px;
  }
  table.table {
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
  }

  #search-input-sidenav {
    margin-left: 67%;
  }
</style>
