import { useRouter } from 'next/router';
import { Container,Nav,Navbar,NavDropdown,Form,Button } from "react-bootstrap";
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { readToken,removeToken } from '@/lib/authenticate';

export default function MainNav() {
  let token = readToken();

  const router=useRouter();  
  const [isExpanded,setIsExpanded]=useState(false);
  const [searchHistory,setSearchHistory]=useAtom(searchHistoryAtom);

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push('/');
  }

  async function handleSubmit(e){
    e.preventDefault();
    const work=e.target.inputWork.value;
    //const queryString="title=true&q="+work;
    const queryString=`title=true&q=${work}`;
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
    setSearchHistory(await addToHistory(queryString));
  }

  function handleLinkClick(){
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
        <Container>
            <Navbar.Brand>Qian Tang</Navbar.Brand>         
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav" 
              data-bs-toggle="collapse"
              data-bs-target="#basic-navbar-nav"
              onClick={() => setIsExpanded(!isExpanded)}
            />  
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" >            
                  <Link href="/" legacyBehavior passHref>
                    <Nav.Link onClick={handleLinkClick} active={router.pathname === "/"}> Home</Nav.Link>
                  </Link>
                  {token &&  <Link href="/Search" legacyBehavior passHref>
                    <Nav.Link onClick={handleLinkClick} active={router.pathname === "/Search"}> Advanced Search</Nav.Link>
                  </Link> }             
                  {/* &nbsp;                               */}
                </Nav>

                {token && <Form className="d-flex" onSubmit={handleSubmit}>
                      <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" name="inputWork"/>
                      <Button variant="success" type="submit" >Search</Button>
                  </Form>}               
                  {/* &nbsp;&nbsp;    */}
                  {token && <Nav>
                    <NavDropdown title={token.userName} id="basic-nav-dropdown">
                      <Link href="/favourites" legacyBehavior passHref>
                        <NavDropdown.Item onClick={handleLinkClick} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                      </Link>
                      <Link href="/History" legacyBehavior passHref>
                        <NavDropdown.Item onClick={handleLinkClick} active={router.pathname === "/History"}>Search History</NavDropdown.Item>
                      </Link>
                      <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>          
                    </NavDropdown>
                  </Nav>}    

                <Nav>
                {!token &&  <Link href="/register" legacyBehavior passHref>
                    <Nav.Link onClick={handleLinkClick} active={router.pathname === "/register"}> Register</Nav.Link>
                  </Link> }             
                  {/* &nbsp; */}
                  {!token &&  <Link href="/login" legacyBehavior passHref>
                    <Nav.Link onClick={handleLinkClick} active={router.pathname === "/Login"}> Login</Nav.Link>
                  </Link> }     
                </Nav>     
            </Navbar.Collapse>   
        </Container>  
      </Navbar>
      <br />
      <br />
    </>    
  );
}
