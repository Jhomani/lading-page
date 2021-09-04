
type Handler = (a: number) => void;

class GlobalEvents {
  private seted: boolean;
  private scrollHandlers: Handler[];
  private resizeHandlers: Handler[];

  constructor() {
    this.seted = false;
    this.scrollHandlers = [];
    this.resizeHandlers = [];
  }

  public init() {
    if (window && !this.seted) {
      window.onscroll = ev => {
        const scrolled = window.scrollY || 0;

        this.scrollHandlers.forEach(fn => fn(scrolled));
      };

      window.onresize = () => {
        const screenWidth = window.innerWidth || 1327;

        this.resizeHandlers.forEach(fn => fn(screenWidth));
      };
    }
  }

  public addResizeHandle(fn: Handler) {
    this.resizeHandlers.push(fn);
  }

  public addScrollHandle(fn: Handler) {
    this.scrollHandlers.push(fn);
  }
}

const globalEvents = new GlobalEvents();

export default globalEvents;