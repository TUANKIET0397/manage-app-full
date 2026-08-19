"use client";

import { CrownOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

const HomePage = () => {
  return (
    <div style={{ padding: 20 }}>
      <Result
        icon={<CrownOutlined />}
        title="Fullstack Next/Nest - createdBy @TuanKietCoder"
      />
      <div
        style={{
          flex: 1,
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1>
          <Button
            type="link"
            href="https://github.com/TUANKIET0397"
            target="_blank"
            style={{
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            If you want to find me, click here!
          </Button>
        </h1>
        <Button
          style={{
            marginTop: "16px",
            width: "300px",
            height: "40px",
            fontSize: "16px",
          }}
          href="/login"
          type="primary"
        >
          Đăng nhập để vào trang quản trị
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
