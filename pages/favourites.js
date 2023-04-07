import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Card , Row, Col} from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

export default function Favourites(){
    const [favouritesList,setFavouritesList]=useAtom(favouritesAtom);
    
    if(!favouritesList) return null;

    return (
      <>
        <br />
        <Row className="gy-4">
          {favouritesList.length ? 
            favouritesList.map((work)=>(
              <Col lg={3} key={work}><ArtworkCard objectID={work} /></Col>
            ))         
          :                 
            <Card>         
              <Card.Body><h4>Nothing Here</h4>Try adding some new artwork to the list.</Card.Body>
            </Card>
              
          }        
        </Row>
      
      </>
    )

    // if(favouritesList){
        
    //   }else{
    //     return null;
    //   }
}