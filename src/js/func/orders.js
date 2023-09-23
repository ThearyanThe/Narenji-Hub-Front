import { getToken } from "../func/utils.js";

const getAndShowUserOrders = async () => {
  const ordersListWrapper = document.querySelector("#tbody-orders");
  const noOrdersListWrapper = document.querySelector("#no-order");
  ordersListWrapper.innerHTML = "";

  const res = await fetch("http://localhost:4000/v1/orders", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const orders = await res.json();

  if (orders.length) {
    orders.forEach((order, index) => {
      ordersListWrapper.insertAdjacentHTML(
        "beforeend",
        `
                <tr class="">
                    <td class="">
                        ${index + 1}
                    </td>
                    <td class="">${order.createdAt.slice( 0, 10)}</td>
                    <td class="">${order.price}</td>
                    <td class="">
                        <a class="" href="#">	جزئیات</a>
                    </td>
                </tr>
            `
      );
    });
  } else {
    noOrdersListWrapper.insertAdjacentHTML('beforeend', `
        <div class="alert alert-danger">سفارشی ثبت نکردید</div>
    `)
  }
};

export { getAndShowUserOrders };
