import { getToken } from "@/lib/authenticate";

//const token=getToken();

export async function addToFavourites(id){
   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${getToken()}`
        },
      });
 
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
}

export async function removeFromFavourites(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${getToken()}`
        },
      });
          
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
}

export async function getFavourites(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${getToken()}`
        },
      });
    
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
}

export async function addToHistory(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          'Authorization': `JWT ${getToken()}`
        },
      });
  
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
}

export async function removeFromHistory(id){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `JWT ${getToken()}`
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
}

export async function getHistory(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${getToken()}`
        },
      });
 
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        return [];
      }
}