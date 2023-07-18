import IdeasAPI from "../services/ideasAPI";
import IdeaList from "./IdeaList";

class IdeaForm {
    constructor () {
        this._formModal = document.getElementById('form-modal')
        this.render();
        this._ideaList = new IdeaList();
    }

    eventListeners() {
        this._form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
    
        const idea = {
          username: this._form.elements.username.value,
          text: this._form.elements.text.value,
          tag: this._form.elements.tag.value,
        };
    
        // Create an instance of IdeasAPI
        const ideasAPI = new IdeasAPI();
    
        try {
          // Call the createIdea method on the instance, not on the class itself
          const newIdea = await ideasAPI.createIdea(idea);
    
          // add idea to list
          this._ideaList.addIdeatoList(newIdea.data.data);
    
          // clear form inputs
          this._form.elements.username.value = '';
          this._form.elements.text.value = '';
          this._form.elements.tag.value = '';
    
          document.dispatchEvent(new Event('closeForm'));
        } catch (error) {
          console.log("Error while creating idea:", error);
        }
      }

    render() {
        this._formModal.innerHTML = `
        <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>
        `;
        this._form = document.getElementById('idea-form');
        this.eventListeners();
    }
}

export default IdeaForm;