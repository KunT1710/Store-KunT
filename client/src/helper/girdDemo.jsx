import { Row, Col } from "antd";

function GridDemo() {
  const boxStyle = {
    background: "#1677ff",
    color: "white",
    textAlign: "center",
    padding: "8px 0",
    borderRadius: "4px",
    fontSize: "12px",
  };
  return (
    <>
      <Row gutter={[8, 8]} style={{ background: "#eee", padding: "16px" }}>
        {/* Mỗi hàng chia theo tỉ lệ cột khác nhau */}

        <Col span={24}>
          <div style={{ background: "#4096ff", color: "#fff", padding: "8px" }}>
            Col 24 (100%)
          </div>
        </Col>

        <Col span={12}>
          <div style={{ background: "#ff7875", color: "#fff", padding: "8px" }}>
            Col 12 (50%)
          </div>
        </Col>
        <Col span={12}>
          <div style={{ background: "#ff7875", color: "#fff", padding: "8px" }}>
            Col 12 (50%)
          </div>
        </Col>

        <Col span={8}>
          <div style={{ background: "#95de64", color: "#fff", padding: "8px" }}>
            Col 8 (33.33%)
          </div>
        </Col>
        <Col span={8}>
          <div style={{ background: "#95de64", color: "#fff", padding: "8px" }}>
            Col 8 (33.33%)
          </div>
        </Col>
        <Col span={8}>
          <div style={{ background: "#95de64", color: "#fff", padding: "8px" }}>
            Col 8 (33.33%)
          </div>
        </Col>

        <Col span={6}>
          <div style={{ background: "#69c0ff", color: "#fff", padding: "8px" }}>
            Col 6 (25%)
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: "#69c0ff", color: "#fff", padding: "8px" }}>
            Col 6 (25%)
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: "#69c0ff", color: "#fff", padding: "8px" }}>
            Col 6 (25%)
          </div>
        </Col>
        <Col span={6}>
          <div style={{ background: "#69c0ff", color: "#fff", padding: "8px" }}>
            Col 6 (25%)
          </div>
        </Col>
      </Row>
      <Row gutter={[4, 8]} style={{ background: "#f0f2f5", padding: "16px" }}>
        {Array.from({ length: 24 }, (_, i) => (
          <Col key={i} span={1}>
            <div style={boxStyle}>{i + 1}</div>
          </Col>
        ))}
      </Row>

      <Row gutter={[12, 12]} style={{ background: "#f0f2f5", padding: "16px" }}>
        <Col span={4}>
          <div style={boxStyle}>Khối 1 (4)</div>
        </Col>
        <Col span={10}>
          <div style={boxStyle}>Khối 2 (10)</div>
        </Col>
        <Col span={6}>
          <div style={boxStyle}>Khối 3 (6)</div>
        </Col>
        <Col span={4}>
          <div style={boxStyle}>Khối 4 (4)</div>
        </Col>
      </Row>

      <Row gutter={[12, 12]} style={{ background: "#f0f2f5", padding: "16px" }}>
        <Col xs={2} xl={4}>
          <div style={boxStyle}>Khối 1</div>
        </Col>
        <Col xs={12} xl={10}>
          <div style={boxStyle}>Khối 2</div>
        </Col>
        <Col xs={8} xl={6}>
          <div style={boxStyle}>Khối 3</div>
        </Col>
        <Col xs={2} xl={4}>
          <div style={boxStyle}>Khối 4</div>
        </Col>
      </Row>
          <Row gutter={[12, 12]} style={{ background: "#f0f2f5", padding: "16px" }}>
      <Col xs={1} xl={2} xxl={4}>
        <div style={boxStyle}>Khối 1</div>
      </Col>
      <Col xs={14} xl={12} xxl={10}>
        <div style={boxStyle}>Khối 2</div>
      </Col>
      <Col xs={8} xl={8} xxl={6}>
        <div style={boxStyle}>Khối 3</div>
      </Col>
      <Col xs={1} xl={2} xxl={4}>
        <div style={boxStyle}>Khối 4</div>
      </Col>
    </Row>
    </>
  );
}

export default GridDemo;
