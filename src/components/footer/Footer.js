import React, { useState } from 'react'
import './footer.css'
import IMG from '../../images/Juju-Logo.png'
import { Link } from 'react-router-dom'



export default function Footer() {
    const [footer,setFooter]= useState(false)

    const changefooter = ()=>{
        console.log(window.scrollY);
        if(window.scrollY <= 1600){
            setFooter(true)
        }else setFooter(false)
    }
    window.addEventListener('scroll',changefooter)
  return (
    <footer class={footer ? "footer " : "footer active"}>
        <div>
            <div class="footer-content">
                <div class="footer-section">
                    <img id='footerimg' src={IMG} alt="" />
                </div>
                <div class="footer-section">
                    <h2>Contact Us</h2>
                    <li>Email: easyvotes@gmail.com</li>
                    <li>Phone: +233244784876</li>
                </div>
                <div class="footer-section">
                    <h2>Learn More</h2>
                    <ul class="lists">
                        <Link class="list"><li>How EasyVotes Works</li></Link>
                        <Link class="list"><li>Why EasyVotes?</li></Link>
                        <Link class="list"><li>Common Questions</li></Link>
                        <Link class="list"><li>Success Stories</li></Link>
                        <Link class="list"><li>Supported Countries</li></Link>
                        <Link class="list"><li>About</li></Link>
                        <Link class="list"><li>Pricing</li></Link>   
                    </ul>
                </div>
                <div class="footer-section">
                    <h2>Resources</h2>
                    <ul class="lists">
                        <Link class="list"><li>Help center</li></Link>
                        <Link class="list"><li>Blog</li></Link>
                        <Link class="list"><li>Newsroom</li></Link>
                        <Link class="list"><li>Careers</li></Link>
                        <Link class="list"><li>About</li></Link>  
                        <Link class="list"><li>More resources</li></Link>
                    </ul>
                </div>
            </div>
            <div class="footer-content2">
                <div class="inner_section">
                    <p class="language">Language . English</p>
                    <div class='inner'>
                        <p>© 2024-2024 EasyVote</p>
                        <Link class="list" >Terms</Link>
                        <Link class="list">Privacy Notice</Link>
                        <Link class="list">Legal</Link>
                        <Link class="list">Accessibility Statement</Link>
                    </div>
                </div>
                
            </div>
        </div>
    </footer>
  )
}
