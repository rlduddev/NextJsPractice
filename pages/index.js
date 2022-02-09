import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({results}) {
    const router = useRouter();
    const onClick = (id, title) => {
      
        // router.push({
        //     pathname: `/movies/${id}`,
        //     query: {
        //         title: title,
        //     }
        // }, `/movies/${id}`)
        router.push(`/movies/${title}/${id}`)
    }

    return (
        <div>
            <Seo title = "Home" />
            {
                results.map((movie) => (
                        <div onClick = {() => onClick(movie.id, movie.title)} key={movie.id}>
                            <img src={`https://images.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                            <h4>
                                {/* <Link href={{
                                   pathname: `/movies/${movie.id}`,
                                   query: {
                                       title: movie.original_title,
                                   } 
                                }} as={`/movies/${movie.id}`} key={movie.id}>
                                    <a>{movie.original_title}</a>
                                </Link> */}

                                <Link href={`/movies/${movie.original_title}/${movie.id}`} key={movie.id}>
                                    <a>{movie.original_title}</a>
                                </Link>    
                            </h4>
                        </div>
                ))
            }
        </div>
    )
}

export async function getServerSideProps() {
    const {results} = await( await fetch(`http://localhost:3000/api/movies`)).json();
    return {
        props: {
            results,
        }
    }
}