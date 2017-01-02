import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomePage.scss';
import { Card, Col, Row } from 'antd';
import {Link} from 'react-router';
import EchartsShow from './echarts';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayTrade: 0,
      todayUser:0
    };
  }
  HomeUnit(){

  }

  render() {
    return(
      <div>
        <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span="12" bordered={true}>
              <h2 style={{ padding: '5px 0px',lineHeight:"37px" }}>业务概览</h2>
              <Card title="订单" bordered={false}><Link to={'/trade'}> 今日订单（ {this.state.todayTrade} ）</Link></Card>
              <Card title="用户" bordered={false} style={{marginTop: '12px' }}>
                <Link to={'/userReview'}>今日新增（ {this.state.todayUser} ）</Link>
              </Card>
            </Col>
            <Col span="12">
              <h2 style={{ padding: '5px 0px',lineHeight:"37px" }}>待处理事项</h2>
              <Card title="订单" bordered={false}>

              </Card>
            </Col>
          </Row>
        </div>
        <div className="echarts_content">
              <EchartsShow />
        </div>
      </div>
  );
  }
}

HomePage.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(HomePage);
