let starEntity = "&#9733";
let defaultConfig = {
  container: "#stars",
  count: 5,
  onColor: "yellow",
  offColor: "white",
  size: "3rem",
};

export class Rate {
    // executed as soon as class is instantiated.
    // initialize default config and call init method.
    constructor(userConfig) {
        this.config = JSON.parse(JSON.stringify(defaultConfig));
        this.init(userConfig);
    }

    // Takes user input config and replace default config
    // for keys which r needed and not all at once
    init(userConfig) {
        Object.keys(userConfig).forEach((key) => {
            this.config[key] = userConfig[key];
        });
        this.createStar();
    }

    createStar() {
        // look for container where stars will be added
        this.container = document.querySelector(this.config.container);
        
        // Just return if nothing in container
        if(!this.container) return;

        // create a start and put in document fragment
        // and attach it to dom so that ww r not manupulating dom directly.
        // fragment is only in memory and we can reduce any extra cost we might get if we directly manipulate the dom.
        let frag = document.createDocumentFragment();

        for( let i=0; i< this.config.count; i++){
            let star = document.createElement('span');
            star.innerHTML = starEntity;
            star.style.fontSize = this.config.size;
            star.style.color = this.config.offColor;
            star.style.cursor = "pointer";
            star.dataset.rate = i + 1; // used this to act as ai indentifier for each start elelemt

            frag.appendChild(star);
        }

        this.container.appendChild(frag);

        //create two variables to handle
        this.stars = this.container.children;
        this.filledStars = 0;

        // Attchoing events for diferent interacxtion with stars
        // using bing in order to access the config that is context rather than accessing only dom.
        this.container.addEventListener("click", this.onClick.bind(this));
        this.container.addEventListener("mouseover", this.onMouseOver.bind(this));
        this.container.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    }

    onClick(e) {
        let clickedStar = Number(e.target.dataset.rate);
    
        if (!clickedStar) return;
    
        for (let index = 0; index < this.filledStars; index++) {
          this.stars[index].style.color = this.config.offColor;
        }
    
        for (let index = 0; index < clickedStar; index++) {
          this.stars[index].style.color = this.config.onColor;
        }
    
        this.filledStars = clickedStar;
      }
      onMouseOver(e) {
        let hoveredStar = Number(e.target.dataset.rate);
    
        if (!hoveredStar) return;
    
        for (let index = 0; index < this.config.count; index++) {
          this.stars[index].style.color = this.config.offColor;
        }
    
        for (let index = 0; index < hoveredStar; index++) {
          this.stars[index].style.color = this.config.onColor;
        }
      }
      onMouseLeave() {
        for (let index = 0; index < this.config.count; index++) {
          this.stars[index].style.color = this.config.offColor;
        }
    
        for (let index = 0; index < this.filledStars; index++) {
          this.stars[index].style.color = this.config.onColor;
        }
      }
}