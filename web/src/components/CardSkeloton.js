import React from "react"
import ContentLoader from "react-content-loader"

const CardSkeleton = (props) => (
  <div style={{ 
    width: "33%",
   }}>
    <ContentLoader 
      speed={2}
      width={400}
      height={460}
      viewBox="0 0 400 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="116" y="106" rx="2" ry="2" width="140" height="10" /> 
      <rect x="120" y="436" rx="2" ry="2" width="140" height="10" /> 
      <rect x="54" y="127" rx="2" ry="2" width="268" height="296" />
    </ContentLoader>
  </div>
)

export default CardSkeleton