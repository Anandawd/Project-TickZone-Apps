import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import CustomAlert from "../../components/Alert";
import CustomBreadCrumb from "../../components/Breadcrumb";
import CustomInputDate from "../../components/InputDate";
import CustomSearchInput from "../../components/SearchInput";
import CustomTableWithAction from "../../components/TableWithAction";

import { fetchListEvents } from "../../redux/lists/actions";
import { fetchOrders, setDate, setPage } from "../../redux/orders/actions";
import { formatDate } from "../../utils/formatDate";

export default function Orders() {
  const dispatch = useDispatch();
  const notif = useSelector((state) => state.notif);
  const orders = useSelector((state) => state.orders);

  let [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders.page, orders.date]);

  useEffect(() => {
    dispatch(fetchListEvents());
  }, [dispatch]);

  const displayDate = `${
    orders.date?.startDate ? formatDate(orders.date?.startDate) : ""
  }${orders.date?.endDate ? " - " + formatDate(orders.date.endDate) : ""}`;

  return (
    <Container className="mt-3">
      <CustomBreadCrumb textSecond={"Orders"} />
      <Row>
        <Col
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <CustomSearchInput disabled query={displayDate} />
          {isShowed ? (
            <CustomInputDate
              date={orders.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ""
          )}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      {notif.status && (
        <CustomAlert type={notif.typeNotif} message={notif.message} />
      )}
      <CustomTableWithAction
        status={orders.status}
        thead={[
          "Nama",
          "Email",
          "Judul",
          "Tanggal Event",
          "Tanggal Order",
          "Tempat",
        ]}
        data={orders.data}
        tbody={["name", "email", "title", "date", "orderDate", "venueName"]}
        pages={orders.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => {
          dispatch(setPage(selected + 1));
        }}
      />
    </Container>
  );
}
