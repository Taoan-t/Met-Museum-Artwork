import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import {useAtom} from 'jotai';
import { favouritesAtom } from '@/store';
import { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { addToFavourites } from '@/lib/userData';
import { removeFromFavourites } from '@/lib/userData';

const fetcher=(url)=>fetch(url).then(res=>{
    if(res.ok) return res.json();
});

export default function ArtworkCardDetail({objectID}){
    const [favouritesList,setFavouritesList]=useAtom(favouritesAtom);
    const [showAdded,setShowAdded]=useState(false);

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
    }, [favouritesList])

    async function favouritesClicked(){
        if(showAdded){
            setFavouritesList(await removeFromFavourites(objectID));
            setShowAdded(false);
        }else{
            setFavouritesList(await addToFavourites(objectID));
            setShowAdded(true);
        }
    }

    const {data, error}=useSWR(objectID?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`:null,fetcher);
      
    if(error){
        return(
            <Error statusCode={404} />
        )     
    } 
    
    if(data){
        return(
            <Card>
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage}/>}    
            <Card.Body>
              <Card.Title>{data.title? data.title:"N/A"}</Card.Title>
              <Card.Text>
                <b>Date: </b>{data.objectDate? data.objectDate:"N/A"} <br/>
                <b>Classification: </b>{data.classification? data.classification:"N/A"}<br/>
                <b>Medium: </b> {data.medium? data.medium:"N/A"}
                <br />
                <br />
                <b>Artist: </b> {data.artistDisplayName ? <>{data.artistDisplayName} (<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>) </> : "N/A"}<br/>
                <b>Credit Line: </b> {data.creditLine ? data.creditLine : "N/A"}<br/>
                <b>Dimensions: </b> {data.dimensions ? data.dimensions : "N/A"}            
              </Card.Text>
              <Button
                    variant={showAdded? 'primary':'outline-primary'}
                    onClick={favouritesClicked}
                >
                    {showAdded? "+ Favourite (added)":"+ Favourite"}
                </Button>
            </Card.Body>   
          </Card>

        );      
    }else{
        return null;
    }

}