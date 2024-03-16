import streamlit as st
import openai

from llama_index.core import VectorStoreIndex, ServiceContext, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI

st.set_page_config(page_title="TETI Ask", page_icon="🧑‍🎓")

openai.api_key = st.secrets["OPENAI_API_KEY"]

st.title("🤖 TETI Ask")

# Membuat chat history baru jika belum ada
if "messages" not in st.session_state.keys(): 
    st.session_state.messages = [
        {"role": "assistant", "content": "Ask me a question about DTETI!"}
    ]

# Loading dan indexing knowledge menggunakan LlamaIndex
@st.cache_resource(show_spinner=False)
def load_data():
    with st.spinner(text="Loading and indexing DTETI Knowledge. Please wait :)"):
        reader = SimpleDirectoryReader(input_dir="./data", recursive=True)
        docs = reader.load_data()
        service_context = ServiceContext.from_defaults(llm=OpenAI(model="gpt-3.5-turbo", temperature=0.5, system_prompt="Kamu adalah ahli di DTETI (Depatermen Teknik Elektro dan Teknologi Informasi) Universitas Gadjah Mada. Asumsikan semua pertanyaan berkaitan dengan DTETI. Jawab pertanyaan sesuai fakta dan jangan berhalusinasi."))
        index = VectorStoreIndex.from_documents(docs, service_context=service_context)
        return index

index = load_data()

# Membuat chat engine baru jika belum ada
if "chat_engine" not in st.session_state.keys():
        st.session_state.chat_engine = index.as_chat_engine(chat_mode="condense_question", verbose=True)

# Mendapatkan prompt dari user dan menambahkan prompt ke history chat
if prompt := st.chat_input("Your question"): 
    st.session_state.messages.append({"role": "user", "content": prompt})

# Menampilkan chat saat ini dan chat sebelumnya di layar
for message in st.session_state.messages: 
    with st.chat_message(message["role"]):
        st.write(message["content"])

# Jika pesan terakhir bukan dari assistant, generate respon baru berdasarkan prompt user
if st.session_state.messages[-1]["role"] != "assistant":
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            response = st.session_state.chat_engine.chat(prompt)
            st.write(response.response)
            message = {"role": "assistant", "content": response.response}
            # Menambahkan respon ke history chat
            st.session_state.messages.append(message)
