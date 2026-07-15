import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";
import { fetchPublicCertificates } from "../services/certificateService";

export default function Certificates() {

  const [certificates, setCertificates] = useState([]);

  useEffect(() => {

    loadCertificates();

  }, []);

  const loadCertificates = async () => {

    try {

      const data = await fetchPublicCertificates();

      setCertificates(data);

    } catch (error) {

      console.error("Failed to load certificates", error);

    }

  };

  return (

    <SectionWrapper id="certificates">

      <div className="section-container">

        <div className="text-center mb-12">

          <p className="section-label">
            Certificates
          </p>

          <h2 className="section-heading">

            My

            <span className="gradient-text">
              {" "}Certificates
            </span>

          </h2>

          <p className="text-slate-400 mt-4 max-w-xl mx-auto">

            Certifications, achievements and credentials earned during my learning journey.

          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {certificates.map((certificate, index) => (

            <motion.div

              key={certificate.id}

              initial={{ opacity: 0, y: 25 }}

              whileInView={{ opacity: 1, y: 0 }}

              viewport={{ once: true }}

              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}

              className="glass-card overflow-hidden"

            >

              {certificate.imageUrl && (

                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="w-full h-48 object-cover"
                />

              )}

              <div className="p-5">

                <h3 className="text-xl font-bold text-white">

                  {certificate.title}

                </h3>

                <p className="text-accent mt-2">

                  {certificate.issuer}

                </p>

                {certificate.issuedDate && (

                  <p className="text-sm text-slate-400 mt-2">

                    Issued :

                    {" "}

                    {certificate.issuedDate}

                  </p>

                )}

                {certificate.credentialUrl && (

                  <a

                    href={certificate.credentialUrl}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="inline-block mt-5 btn-primary"

                  >

                    View Credential

                  </a>

                )}

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </SectionWrapper>

  );

}