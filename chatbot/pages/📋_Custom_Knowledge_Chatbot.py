import streamlit as st
import openai
import os

from llama_index.core import VectorStoreIndex, ServiceContext, SimpleDirectoryReader
from llama_index.llms.openai import OpenAI

st.set_page_config(page_title="TETI Ask", page_icon="🧑‍🎓")

openai.api_key = st.secrets["OPENAI_API_KEY"]

st.title("📋 Custom Knowledge Chatbot")

prompt_command = st.sidebar.text_area("Main Command for Chatbot 🤖", "Kamu adalah ahli di DTETI (Depatermen Teknik Elektro dan Teknologi Informasi) Universitas Gadjah Mada. Asumsikan semua pertanyaan berkaitan dengan DTETI. Jawab pertanyaan sesuai fakta dan jangan berhalusinasi.")

knowledge_files = st.sidebar.file_uploader("Upload knowledges file 📋", type=["pdf"], accept_multiple_files=True)

delete_chat = st.sidebar.button("🚮 Delete Chat History")

# Jika tidak ada knowledge file atau tombol delete chat ditekan, maka hapus cache dan session pengguna
if knowledge_files == [] or delete_chat:
    knowledge_files = None
    if os.path.exists("data_knowledge"):
        for file in os.listdir("data_knowledge"):
            os.remove("data_knowledge/" + file)
        os.rmdir("data_knowledge")
    st.cache_resource.clear()
    st.session_state.clear()

if knowledge_files is not None:
    print("Knowledge files uploaded!") # Untuk debugging

# Jika user sudah mengupload knowledge file dan mengisi main command, maka mulai pemrosesan
if knowledge_files is not None and prompt_command is not None:
    # Simpan knowledge file ke direktori data_knowledge
    if not os.path.exists("data_knowledge"):
        os.makedirs("data_knowledge")

    for file in knowledge_files:
        bytes_data = file.getvalue()

        with open("data_knowledge/" + file.name, "wb") as f:
            f.write(bytes_data)

    # Membuat chat history baru jika belum ada
    if "messages" not in st.session_state.keys():
        st.session_state.messages = [
            {"role": "assistant", "content": "Ask me a question about the knowledge given!"}
        ]

    # Loading dan indexing knowledge menggunakan LlamaIndex
    @st.cache_resource(show_spinner=False)
    def load_data():
        with st.spinner(text="Loading and Indexing Knowledge. Please wait :)"):
            reader = SimpleDirectoryReader(input_dir = "./data_knowledge", recursive=True)
            docs = reader.load_data()
            service_context = ServiceContext.from_defaults(llm=OpenAI(model="gpt-3.5-turbo", temperature=0.1, system_prompt=prompt_command))
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

else:
    st.warning("Please upload a knowledge file first!")
