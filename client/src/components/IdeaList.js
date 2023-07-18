class IdeaList {
    constructor () {
        this._ideaListEl = document.getElementById('idea-list');
        this._validTags = new Set();
        this._validTags.add('technology');
        this._validTags.add('software');
        this._validTags.add('business');
        this._validTags.add('inventions');
        this._validTags.add('health');
        this._validTags.add('education');


        this._ideas = [
            {
                id: 1,
                text: 'The magic of technology lies in its ability to turn science fiction into reality.',
                tag: 'technology',
                username: 'mark',
                date: '21-04-2021'
            },
            {
                id: 1,
                text: 'Business is a canvas, and visionary leaders paint the picture of a better tomorrow.',
                tag: 'business',
                username: 'henry',
                date: '13-07-2022'
            },
            {
                id: 1,
                text: 'Health is a lifelong partnership between our choices and our well-being.',
                tag: 'health',
                username: 'jos',
                date: '06-03-2023'
            },
        ];
        this.render();
    }

    getTagClass(tag) {
        tag = tag.toLowerCase();
        let tagClass = '';
        if (this._validTags.has(tag)) {
            tagClass = `tag-${tag}`
        } else {
            tagClass = '';
        }
        return tagClass;
    }

    render() {
        this._ideaListEl.innerHTML = this._ideas.map((idea) => {
            const tagClass = this.getTagClass(idea.tag);
            return `
            <div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>
            `;
        }).join('');
    }
}


export default IdeaList;