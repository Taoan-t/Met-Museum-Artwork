import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

const fetcher=(url)=>fetch(url).then(res=>{
    if(res.ok) return res.json();
});


export default function ArtworkCard({objectID}){
    const {data, error}=useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,fetcher);

    if(error){
        return(
            <Error statusCode={404} />
        )     
    } 
    if(data){
        return(
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.primaryImageSmall? data.primaryImageSmall:"https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
            <Card.Body>
              <Card.Title>{data.title? data.title:"N/A"}</Card.Title>
              <Card.Text>
                <b>Date: </b>{data.objectDate? data.objectDate:"N/A"} <br/>
                <b>Classification: </b>{data.classification? data.classification:"N/A"}<br/>
                <b>Medium: </b> {data.medium? data.medium:"N/A"}
              </Card.Text>
              <Link href={`/artwork/${objectID}`} passHref>
                <Button variant="outline-primary">ID: {objectID}</Button>
              </Link>
            </Card.Body>
          </Card>
        );      
    }else{
        return null;
    }

}