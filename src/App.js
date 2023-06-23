import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';


const { Header, Content } = Layout;

const App = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Routes>
            <Route exact path="/" element={<CharacterList />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />
          
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
