import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Card , Row, Pagination,Col} from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE=12;

const fetcher=(url)=>fetch(url).then(res=>{
  if(res.ok) return res.json();
});

export default function Home() {
  const [artworkList,setArtworkList]=useState();
  const [page,setPage]=useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const{data, error}=useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,fetcher);

  function previousPage(){
    if(page>1){
      setPage(page=>page-1);
    }
  }

  function nextPage(){
    if(page<artworkList.length){
      setPage(page=>page+1);
    }
  }

  useEffect(()=>{
    if(data){
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

      let results=[];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
            const chunk = filteredResults.slice(i, i + PER_PAGE);
            results.push(chunk);
      }
      
      setArtworkList(results);
      setPage(1);
    }
  },[data]);

  if(error){
    return <Error statusCode={404} />;
  }

  if(artworkList){
    return (
      <>
        <br />
        <Row className="gy-4">
          {artworkList.length ? 
            artworkList[page-1].map((work)=>(
              <Col lg={3} key={work}><ArtworkCard objectID={work} /></Col>
            ))         
          :                 
            <Card>         
              <Card.Body><h4>Nothing Here</h4>Try searching for something else.</Card.Body>
            </Card>
              
          }        
        </Row>
      
        {artworkList.length ?  <><br /><Row><Col><Pagination>
          <Pagination.Prev onClick={previousPage}/>
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage}/>
        </Pagination></Col></Row></>: ''}
      </>
    )
  }else{
    return null;
  }
 
}
